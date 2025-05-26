module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define("Proposal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    freelancerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    expectedBudget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    timelineInDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    timestamps: true,
    tableName: "proposals",
  });

  Proposal.associate = (models) => {
    Proposal.belongsTo(models.Job, { foreignKey: "jobId", onDelete: "CASCADE" });
    Proposal.belongsTo(models.User, { foreignKey: "freelancerId", onDelete: "CASCADE" });
  };

  return Proposal;
};
