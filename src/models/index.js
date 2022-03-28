const config = require('../config/db.config.js');
const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("../models/category.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);

db.merchant = require("../models/merchant.model")(sequelize, Sequelize);
db.merchant_image = require("../models/merchant_image.model")(sequelize, Sequelize);
db.merchant_content = require("../models/merchant_content.model")(sequelize, Sequelize);
db.merchant_rate = require("../models/valet_rate.model")(sequelize, Sequelize);
db.user_merchant = require("../models/user_merchant.model")(sequelize, Sequelize);
db.user_level = require("../models/user_level")(sequelize, Sequelize);

//Valet
db.valet_order = require("../models/valet_order.model")(sequelize, Sequelize);
db.valet_destination = require("../models/valet_destination.model")(sequelize, Sequelize);
db.valet_history = require("../models/valet_history.model")(sequelize, Sequelize);
db.coupon = require("../models/valet_coupon.model")(sequelize, Sequelize);
db.status = require("../models/valet_status.model")(sequelize, Sequelize);

//Homepage
db.ad = require('../models/ad.model')(sequelize, Sequelize);

//Relation page
db.category.hasMany(db.merchant, { foreignKey: 'category_id' });
db.merchant.hasMany(db.merchant_image, { foreignKey: 'merchant_id', as: 'slider' });
db.merchant.hasMany(db.merchant_content, { foreignKey: 'merchant_id', as: 'contents' });
db.merchant.hasMany(db.merchant_rate, { foreignKey: 'merchant_id', as: 'merchant_rates' });
db.merchant_image.belongsTo(db.merchant, { foreignKey: 'merchant_id', as: 'merchant' });
db.merchant_content.belongsTo(db.merchant, { foreignKey: 'merchant_id', as: 'merchant' });
db.user.hasMany(db.user_merchant, { foreignKey: 'user_id', as: 'merchant' });
// db.merchant.hasMany(db.user_merchant, { foreignKey: 'merchant_id' });

db.user_merchant.belongsTo(db.user, { foreignKey: 'user_id', as: 'user' });
db.user_merchant.belongsTo(db.merchant, { foreignKey: 'merchant_id' });

module.exports = db;
