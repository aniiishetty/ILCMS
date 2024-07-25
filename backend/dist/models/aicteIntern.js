"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AicteIntern = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AicteIntern extends sequelize_1.Model {
    // Define associations
    static associate(models) {
        AicteIntern.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}
exports.AicteIntern = AicteIntern;
AicteIntern.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    homeAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rollNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    academicConcentration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    overallGPA: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    academicYear: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    schoolName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    schoolCityState: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    campusAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    campusPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    campusFaxNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    schoolEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hodName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hodEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    resume: {
        type: sequelize_1.DataTypes.BLOB('long'),
        allowNull: true,
    },
    internshipPreferences: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    learningObjectives: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    technicalSkills: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    internshipActivities: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    evidenceToFaculty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'aicte_interns',
});
