const BaseController = require("../core/base_controller");

class ReviewController extends BaseController{
    constructor(){
        super();
    }

    async create(req, res) {
        try {
            const reviewerId = req.user.id;
            const result = await this.ReviewService.createReview({reviewerId, ...req.body});
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});   
        }
    }

    async update(req, res) {
        try {
            const reviewData = {reviewId: req.params.id, ...req.body};
            const result = await this.ReviewService.updateReview(reviewData);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const reviewId = req.params.id;
            const result = await this.ReviewService.deleteReview(reviewId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const reviews = await this.ReviewService.findAll();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByJobId(req, res) {
        try {
            const jobId = req.params.id;
            const result = await this.ReviewService.getReviewsByJobId(jobId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByReviewerId(req, res) {
        try {
            const reviewerId = req.user.id;
            const reviews = await this.ReviewService.getReviewsByReviewerId(reviewerId);
            res.status(200).json(reviews);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}