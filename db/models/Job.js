module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("Job", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: {  
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("open", "closed", "in_progress"),
      defaultValue: "open",
    },
    assignedFreelancerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    timestamps: true,
    tableName: "jobs",
  });

  Job.associate = (models) => {
    Job.belongsTo(models.User, { foreignKey: "clientId", as: "client" });
  };
  Job.associate = (models) => {
    Job.belongsTo(models.User, { foreignKey: "assignedFreelancerId", as: "freelancer" });
    Job.hasMany(models.Review, { foreignKey: "jobId" });
  };

  return Job;
};
