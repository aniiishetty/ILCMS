"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/models/Admin.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Role_1 = __importDefault(require("./Role"));
class Admin extends sequelize_1.Model {
}
Admin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Role_1.default,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'admins',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
exports.default = Admin;
