const BaseService = require("../core/base_service");
const db = require("../db/index");
class JobService extends BaseService{
    constructor(){
        super(db.Job);
        this.db = db;
    }

    async createJob(jobData) {
        const { clientId, title, description, budget } = jobData;

        const user = await this.db.User.findByPk(clientId);
        if (!user) throw new Error("Client not found");
        const newJob = await this.create({
            clientId,
            title,
            description,
            budget,
        });

        return { message: "Job created successfully", data: newJob };
    }
    async updateJob(jobData) {
        const { jobId, title, description, budget } = jobData;

        const job = await this.findByPk(jobId);
        if (!job) throw new Error("Job not found");

        await job.update({
            title,
            description,
            budget,
        });

        return { message: "Job updated successfully", data: job };
    }

    async deleteJob(jobId) {
        const job = await this.findByPk(jobId);
        if (!job) throw new Error("Job not found");

        await job.destroy();
        return { message: "Job deleted successfully" };
    }

    async getJobById(jobId) {
        const job = await this.findByPk(jobId);
        if (!job) throw new Error("Job not found");
        return job;
    }

    async getJobsByClientId(clientId) {
        const user = await this.db.User.findByPk(clientId);
        if (!user) throw new Error("Client not found");

        const jobs = await this.findAll({ where: { clientId } });
        return jobs;
    }
}

module.exports = new JobService();