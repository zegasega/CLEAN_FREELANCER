const BaseController = require("../core/base_controller");

class ProposalController extends BaseController{
    constructor(){
        super();
    }

    async create(req, res){
        try {
            const freelancerId = req.user.id;
            const jobId = req.params.jobId;
            const proposalData = { freelancerId, jobId, ...req.body };
            const result = await this.ProposalService.createProposal(proposalData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const proposalId = req.params.id;
            const proposalData = { proposalId, ...req.body };
            const result = await this.ProposalService.updateProposal(proposalData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const proposalId = req.params.id;
            const result = await this.ProposalService.deleteProposal(proposalId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProposalsByJob(req, res) {
        try {
            const jobId = req.params.jobId;
            const proposals = await this.ProposalService.getProposalsByJob(jobId);
            res.status(200).json(proposals);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const proposals = await this.ProposalService.findAll();
            res.status(200).json(proposals);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const proposalId = req.params.id;
            const proposal = await this.ProposalService.findByPk(proposalId);
            if (!proposal) {
                return res.status(404).json({ error: "Proposal not found" });
            }
            res.status(200).json(proposal);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new ProposalController();