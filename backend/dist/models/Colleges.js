"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.College = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class College extends sequelize_1.Model {
}
exports.College = College;
College.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        // Remove the unique constraint from the name field
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that code is unique across the table
    },
    Active_Status: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        // No need for onUpdate option
    },
}, {
    sequelize: database_1.default,
    tableName: 'colleges',
    timestamps: true, // Ensure timestamps are enabled
    indexes: [
        {
            unique: true,
            fields: ['code'], // Ensure uniqueness for code
        },
    ],
});
