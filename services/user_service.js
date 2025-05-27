const BaseService = require("../core/base_service");
const db = require("../db/index");
const { getClient } = require("../services/redis_service");

class UserService extends BaseService {
  constructor() {
    super(db.User);
  }

  async createUser(userData) {
    const { username, email, password, role } = userData;

    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new Error("This email is already in use.");
    }

    const hashedPassword = await this.Utils.hashPassword(password);

    const newUser = await this.create({
      username,
      email,
      password: hashedPassword,
      role,
      jwtTokenVersion: 0,
    });

    return {
      message: "User Created Succesfully.",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }


  async loginUser({ email, password }) {
    const redisClient = getClient();

    const loginAttemptsKey = `login-attempts:${email}`;
    const lockKey = `login-lock:${email}`;

    const isLocked = await redisClient.get(lockKey);
    if (isLocked) {
      throw new Error("Too many failed login attempts. Please try again in 10 minutes.");
    }

    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("No user found with this email.");
    }

    const isPasswordValid = await this.Utils.comparePassword(password, user.password);
    if (!isPasswordValid) {
      const attempts = await redisClient.incr(loginAttemptsKey);
      if (attempts === 1) {
        await redisClient.expire(loginAttemptsKey, 600); 
      }

      if (attempts >= 3) {
        await redisClient.set(lockKey, "1", { EX: 600 });
        await redisClient.del(loginAttemptsKey); 
        throw new Error("Too many failed login attempts. You are locked out for 10 minutes.");
      }

      throw new Error("Incorrect password.");
    }

    
    await redisClient.del(loginAttemptsKey);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      jwtTokenVersion: user.jwtTokenVersion,
    };

    const accessToken = this.Utils.generateAccessToken(payload);
    const refreshToken = this.Utils.generateRefreshToken(payload);

    return {
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async logoutUser(userID) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    user.jwtTokenVersion += 1;
    await user.save();

    return { message: "User logged out successfully." };
  }

  async getUserByID(userID) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    return {
      message: "Success",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getAllUsers() {
    const users = await this.findAll();
    if (users.length === 0) {
      return { message: "No users found."};
    }

    const safeUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    return { message: "Success", data: safeUsers };
  }

  async deleteUser(userID) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    await user.destroy();
    return { message: "User deleted successfully." };
  }

  async updateUser(userID, userData) {
    const user = await this.findById(userID);
    if (!user) {
      throw new Error("User not found.");
    }

    const { username, email, password, role } = userData;

    if (email && email !== user.email) {
      const existingUser = await this.findOne({ email });
      if (existingUser) {
        throw new Error("This email is already in use.");
      }
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await this.Utils.hashPassword(password);
    }

    if (role) {
      user.role = role;
    }

    await user.save();

    return {
      message: "User updated successfully.",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}

module.exports = new UserService();
