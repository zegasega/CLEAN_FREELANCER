const service = {};

service.adminService = require("./admin_service");
service.emailService = require("./email_service");
service.userService = require("./user_service");


module.exports = service;