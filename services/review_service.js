const BaseService = require("../core/base_service");
const db = require("../db/index");
class ReviewService extends BaseService {
    constructor() {
        super(db.Review);
        this.db = db;
    }

    
    async createReview(reviewData) {
        const { jobId, reviewerId, reviewText, rating } = reviewData;

        const job = await this.db.Job.findByPk(jobId);
        if (!job) throw new Error("Job not found");
        
        if(job.status !== "completed") {
            throw new Error("Job must be completed before a review can be created");
        }

        const reviewer = await this.db.User.findByPk(reviewerId);
        if (!reviewer) throw new Error("Reviewer not found");

        const newReview = await this.create({
            jobId,
            reviewerId,
            reviewText,
            rating,
        });

        return { message: "Review created successfully", data: newReview };
    }

    async updateReview(reviewData) {
        const { reviewId, reviewText, rating } = reviewData;

        const review = await this.findByPk(reviewId);
        if (!review) throw new Error("Review not found");

        await review.update({
            reviewText,
            rating,
        });

        return { message: "Review updated successfully", data: review };
    }

    async deleteReview(reviewId) {
        const review = await this.findByPk(reviewId);
        if (!review) throw new Error("Review not found");

        await review.destroy();
        return { message: "Review deleted successfully" };
    }

    async getReviewsByJobId(jobId) {
        const job = await this.db.Job.findByPk(jobId);
        if (!job) throw new Error("Job not found");

        const reviews = await this.findAll({ where: { jobId } });
        return { message: "Reviews retrieved successfully", data: reviews };
    }

    async getReviewsByReviewerId(reviewerId) {
        const reviewer = await this.db.User.findByPk(reviewerId);
        if (!reviewer) throw new Error("Reviewer not found");

        const reviews = await this.findAll({ where: { reviewerId } });
        return { message: "Reviews retrieved successfully", data: reviews };
    }
}

module.exports = new ReviewService();