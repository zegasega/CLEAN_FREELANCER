module.exports = (sequelize, DataTypes) => {
  const FreelancerProfile = sequelize.define("FreelancerProfile", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    title: { type: DataTypes.STRING },
    skills: { type: DataTypes.STRING },                         
    hourlyRate: { type: DataTypes.FLOAT }
}, {
    timestamps: true,
    tableName: "freelancer_profiles",
  });

  FreelancerProfile.associate = (models) => {
    FreelancerProfile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return FreelancerProfile;
};
