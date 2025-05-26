const BaseController = require("../core/base_controller");

class JobController extends BaseController{
    constructor(){
        super();
    }

    async create(req, res){
        try {
            const clientId = req.user.id;
            const result = await this.JobService.createJob({clientId, ...req.body});
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});   
        }
    }

    async update(req, res) {
        try {
            const jobData = {jobId: req.params.id, ...req.body};
            const result = await this.JobService.updateJob(jobData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const jobId = req.params.id;
            const result = await this.JobService.deleteJob(jobId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const jobs = await this.JobService.findAll();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const jobId = req.params.id;
            const job = await this.JobService.getJobById(jobId);
            res.status(200).json(job);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByClientId(req, res) {
        try {
            const clientId = req.user.id;
            const jobs = await this.JobService.getJobsByClientId(clientId);
            res.status(200).json(jobs);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new JobController();