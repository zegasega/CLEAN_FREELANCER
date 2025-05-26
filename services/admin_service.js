const BaseService = require("../core/base_service");
const db = require('../db/index');
const { Op, where } = require('sequelize');


class AdminService extends BaseService{
    constructor() {
        super(db.UserBan);
        this.db = require("../db/index");
    }



   async banUser(userId, reason, durationInDays) {
        const user = await this.db.User.findByPk(userId);
        if (!user) throw new Error("User not found");

        const days = Number(durationInDays);
        if (isNaN(days) || days <= 0) {
            throw new Error("Invalid durationInDays value");
        }

        const existingBan = await this.db.UserBan.findOne({
            where: {
            userId,
            bannedUntil: {
                [Op.gt]: new Date()
            }
            }
        });

        if (existingBan) throw new Error("User is already banned");

        const bannedUntil = new Date();
        bannedUntil.setDate(bannedUntil.getDate() + days);
        console.log(bannedUntil);
        const banRecord = await this.db.UserBan.create({
            userId,
            reason,
            bannedUntil,
            bannedAt: new Date()
        });

        return {
            message: "User banned successfully",
            data: banRecord
        };
    }

    async unbanUser(userId) {
        const banRecord = await this.findOne({ userId });
        if (!banRecord) throw new Error("User is not banned");

        await this.delete(banRecord.id);

        return { message: "User unbanned successfully" };
    }

    async getBannedUsers() {
        const bannedUsers = await this.findAll();
        return { data: bannedUsers };
    }

    async getBanInfo(userId) {
        const user = await this.findOne({userId});
        
        if (!user) throw new Error("User not found");

        return {
            message: "User ban info retrieved successfully",
            data: user
        };
    }


}

module.exports = new AdminService();