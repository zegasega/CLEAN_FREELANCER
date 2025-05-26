module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        clientId: { // client user id
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        freelancerId: { // freelancer user id
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User, { as: 'client', foreignKey: 'clientId' });      // reviewer is client
        Review.belongsTo(models.User, { as: 'freelancer', foreignKey: 'freelancerId' });  // reviewee is freelancer
        Review.belongsTo(models.Job, { foreignKey: 'jobId' });
    };

    return Review;
};