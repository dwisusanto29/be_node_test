module.exports = (sequelize, Sequelize) => {
    const walletTrans = sequelize.define('wallet_transaction', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        to_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        amount: {
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
    return walletTrans;
}


