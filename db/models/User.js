module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "freelancer", "client"),
      defaultValue: "freelancer",
      allowNull: false,
    },
    jwtTokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

   User.associate = (models) => {
      User.hasOne(models.UserBan, { foreignKey: "userId", as: "banInfo" });
      User.hasOne(models.ClientProfile, { foreignKey: "userId", as: "clientProfile" });
      User.hasOne(models.FreelancerProfile, { foreignKey: "userId", as: "freelancerProfile" });
      User.hasMany(models.Job, { foreignKey: "clientId", as: "jobs" }); 
  };



  return User;
};
