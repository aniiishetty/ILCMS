"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchModel = void 0;
// BranchModel.js
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Degree_1 = require("./Degree");
class BranchModel extends sequelize_1.Model {
}
exports.BranchModel = BranchModel;
BranchModel.init({
    BranchID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    BranchName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    degreeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Allow NULL values
    },
}, {
    sequelize: database_1.default,
    tableName: 'Branches',
    timestamps: true,
});
BranchModel.belongsTo(Degree_1.Degree, { foreignKey: 'degreeId', as: 'BranchDegree' }); // Updated the alias
