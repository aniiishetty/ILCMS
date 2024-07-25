"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
// models/Admin.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Admin extends sequelize_1.Model {
}
exports.Admin = Admin;
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'admins',
    timestamps: true, // Add timestamps to keep track of record creation and updates
    indexes: [
        {
            unique: true,
            fields: ['Username'] // Create a composite index on Username and email columns
        }
    ]
});
