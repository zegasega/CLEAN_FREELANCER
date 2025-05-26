const db = require('../db/index');
const BaseService = require('../core/base_service');

class ProposalService extends BaseService {
    constructor() {
        super(db.Proposal);
        this.db = db;
    }

    async createProposal(proposalData) {
        let { freelancerId, jobId, coverLetter, bidAmount } = proposalData;

        freelancerId = Number(freelancerId);
        jobId = Number(jobId);

        if (isNaN(freelancerId) || isNaN(jobId)) {
            throw new Error("Invalid freelancerId or jobId");
        }

        const freelancer = await this.db.User.findByPk(freelancerId);
        if (!freelancer) throw new Error("Freelancer not found");

        const job = await this.db.Job.findByPk(jobId);
        if (!job) throw new Error("Job not found");

        const existingProposal = await this.db.Proposal.findOne({ where: { freelancerId, jobId } });
        if (existingProposal) throw new Error("Proposal already exists for this job by this freelancer");

        const newProposal = await this.db.Proposal.create({
            freelancerId,
            jobId,
            coverLetter,
            bidAmount,
        });

        return { message: "Proposal created successfully", data: newProposal };
    }

    async updateProposal(proposalData) {
        const { proposalId, coverLetter, bidAmount } = proposalData;

        const proposal = await this.db.Proposal.findByPk(proposalId);
        if (!proposal) throw new Error("Proposal not found");

        await proposal.update({
            coverLetter,
            bidAmount,
        });

        return { message: "Proposal updated successfully", data: proposal };
    }

    async deleteProposal(proposalId) {
        const proposal = await this.db.Proposal.findByPk(proposalId);
        if (!proposal) throw new Error("Proposal not found");

        await proposal.destroy();
        return { message: "Proposal deleted successfully" };
    }

    async getProposalsByJob(jobId) {
        jobId = Number(jobId);
        if (isNaN(jobId)) throw new Error("Invalid jobId");

        const job = await this.db.Job.findByPk(jobId);
        if (!job) throw new Error("Job not found");

        const proposals = await this.db.Proposal.findAll({ where: { jobId } });
        return proposals;
    }
}

module.exports = new ProposalService();