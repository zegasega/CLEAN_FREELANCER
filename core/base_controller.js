class BaseController {
  constructor() {
    this.UserService = require("../services/user_service");
    this.ProfileService = require("../services/profile_service");
    this.AdminService = require("../services/admin_service");
    this.JobService = require("../services/job_service");
    this.ProposalService = require("../services/proposal_service");
    this.ReviewService = require("../services/review_service");
    this.EmailService = require("../services/email_service");
  } 
}

module.exports = BaseController;
