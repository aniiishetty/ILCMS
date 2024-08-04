"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Degree_1 = require("./Degree");
const DegreeStatus_1 = require("./DegreeStatus");
const BranchModel_1 = require("./BranchModel");
const Colleges_1 = require("./Colleges");
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasOne(models.AicteIntern, { foreignKey: 'userId', as: 'aicteInterns' });
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    IIMSTC_ID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    collegeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    university: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    usn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    passportPhoto: {
        type: sequelize_1.DataTypes.BLOB('long'),
        allowNull: false,
    },
    aadharNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aadharProof: {
        type: sequelize_1.DataTypes.BLOB('long'),
        allowNull: false,
    },
    degreeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    degreeStatusId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    otp: {
        type: sequelize_1.DataTypes.STRING, // Store OTP as a string
        allowNull: true, // Allow null when not in use
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    indexes: [
        {
            unique: true,
            fields: ['email', 'IIMSTC_ID'],
        },
    ],
    timestamps: true,
});
// Associations
User.belongsTo(Degree_1.Degree, { foreignKey: 'degreeId', as: 'degreeDetails' });
User.belongsTo(DegreeStatus_1.DegreeStatus, { foreignKey: 'degreeStatusId', as: 'degreeStatusDetails' });
User.belongsTo(BranchModel_1.BranchModel, { foreignKey: 'branchId', as: 'branchDetails' });
User.belongsTo(Colleges_1.College, { foreignKey: 'collegeId', as: 'collegeDetails' });
