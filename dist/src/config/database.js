"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', 'l1IYOR9AolHJ1o3pSc6K', {
    host: 'vaiparacontaprod01.cfm4ams0261o.us-east-1.rds.amazonaws.com/',
    dialect: 'postgres',
});
exports.default = sequelize;
