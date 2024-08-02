"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeStatus = void 0;
// DegreeStatus.js
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Degree_1 = require("./Degree");
class DegreeStatus extends sequelize_1.Model {
}
exports.DegreeStatus = DegreeStatus;
DegreeStatus.init({
    DegreeStatusID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    degreeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Allow NULL values
    },
}, {
    sequelize: database_1.default,
    tableName: 'DegreeStatus',
    timestamps: true,
});
DegreeStatus.belongsTo(Degree_1.Degree, { foreignKey: 'degreeId', as: 'DegreeStatusDegree' }); // Updated the alias
Degree_1.Degree.hasMany(DegreeStatus, { foreignKey: 'degreeId', as: 'DegreeStatuses' });
