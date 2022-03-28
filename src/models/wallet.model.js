module.exports = (sequelize, Sequelize) => {
    const wallet = sequelize.define('wallet', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        balance: {
            type: Sequelize.DECIMAL,
            allowNull: null,
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_at'
        }
    });
    return wallet;
}


