"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the import path as necessary
// Define the model class
class InternshipModel extends sequelize_1.Model {
}
exports.InternshipModel = InternshipModel;
// Initialize the model
InternshipModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.ENUM('GraduatesWithin2Years', 'FourToSixSemester', 'SevenToEightSemester'),
        allowNull: false,
    },
    graduationYear: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
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
    tableName: 'InternshipModel',
    timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
});
