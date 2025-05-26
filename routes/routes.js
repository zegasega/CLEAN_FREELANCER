const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller");
const ProfileController = require("../controllers/profile_controller");
const AdminController = require("../controllers/admin_controller");
const JobController = require("../controllers/job_controller");
const ProposalController = require("../controllers/proposal_controller");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");


// AUTH/ USER ROUTES
router.post("/auth/register", (req, res) =>  UserController.Register(req, res));
router.post("/auth/login", (req, res) => UserController.Login(req, res));
router.post("/auth/logout", authMiddleware,(req, res) => UserController.Logout(req, res));
router.get("/users", authMiddleware,(req, res) => UserController.GetAllUsers(req, res));
router.get("/users/:id", authMiddleware, (req, res) => UserController.GetUserByID(req, res));
router.delete("/users/:id", authMiddleware, (req, res) => UserController.DeleteUser(req, res));
router.put("/users/:id", authMiddleware, (req, res) => UserController.UpdateUser(req, res));


// PROFILE ROUTES
router.post("/profile/client", authMiddleware, roleMiddleware("client"), (req, res) => ProfileController.CreateClientProfile(req, res));
router.put("/profile/client", authMiddleware, roleMiddleware("client"), (req, res) => ProfileController.UpdateClientProfile(req, res));
router.post("/profile/freelancer", authMiddleware, roleMiddleware("freelancer"), (req, res) => ProfileController.CreateFreelancerProfile(req, res));
router.put("/profile/freelancer", authMiddleware, roleMiddleware("freelancer"), (req, res) => ProfileController.UpdateFreelancerProfile(req, res));


// ADMIN ROUTES
router.post("/admin/ban/:id", authMiddleware, roleMiddleware("admin"), (req, res) => AdminController.Ban(req, res));
router.post("/admin/unban/:id", authMiddleware, roleMiddleware("admin"), (req, res) => AdminController.Unban(req, res));
router.get("/admin/banned-users", authMiddleware, roleMiddleware("admin"), (req, res) => AdminController.GetBannedUsers(req, res));
router.get("/admin/ban-info/:id", authMiddleware, roleMiddleware("admin"), (req, res) => AdminController.GetBanInfo(req, res));


// JOB ROUTES
router.post("/jobs", authMiddleware, roleMiddleware("client"), (req, res) => JobController.create(req, res));
router.put("/jobs/:id", authMiddleware, roleMiddleware("client", "admin"), (req, res) => JobController.update(req, res));
router.delete("/jobs/:id", authMiddleware, roleMiddleware("client", "admin"), (req, res) => JobController.delete(req, res));
router.get("/jobs", authMiddleware, (req, res) => JobController.getAll(req, res));

// PROPOSAL ROUTES
router.post("/jobs/:jobId/proposals", authMiddleware, roleMiddleware("freelancer"), (req, res) => ProposalController.create(req, res));
router.put("/proposals/:id", authMiddleware, roleMiddleware("freelancer"), (req, res) => ProposalController.update(req, res));
router.delete("/proposals/:id", authMiddleware, roleMiddleware("freelancer"), (req, res) => ProposalController.delete(req, res));
router.get("/jobs/:jobId/proposals", authMiddleware, (req, res) => ProposalController.getProposalsByJob(req, res));


module.exports = router;
