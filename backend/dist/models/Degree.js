"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Degree = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the import path as necessary
// Define the model class
class Degree extends sequelize_1.Model {
}
exports.Degree = Degree;
// Initialize the model
Degree.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DegreeName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Degrees',
    timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
});
