const BaseController = require("../core/base_controller");

class AdminController extends BaseController{
    constructor(){
        super();
    }

    async Ban(req, res) {
        try {
            const userId = req.params.id;
            const { reason, bannedUntil } = req.body;
            const result = await this.AdminService.banUser(userId, reason, bannedUntil);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async Unban(req, res) {
        try {
            const userId = req.params.id;
            const result = await this.AdminService.unbanUser(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async GetBannedUsers(req, res) {
        try {
            const result = await this.AdminService.getBannedUsers();
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async GetBanInfo(req, res) {
        try {
            const userId = req.params.id;
            const result = await this.AdminService.getBanInfo(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AdminController();