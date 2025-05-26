module.exports = (sequelize, DataTypes) => {
  const UserBan = sequelize.define("UserBan", {
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bannedUntil: {
      type: DataTypes.DATE,
      allowNull: true, // null means no ban
    }
  }, {
    timestamps: true,
    tableName: "user_bans"
  });

  UserBan.associate = (models) => {
    UserBan.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return UserBan;
};
