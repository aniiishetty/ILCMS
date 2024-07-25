"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
    // Define associations
    static associate(models) {
        User.hasMany(models.AicteIntern, { foreignKey: 'userId', as: 'aicteInterns' });
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
    collegeName: {
        type: sequelize_1.DataTypes.STRING,
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
    verificationType: {
        type: sequelize_1.DataTypes.ENUM('Aadhar', 'Passport'),
        allowNull: false,
    },
    verificationId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    branch: {
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
        allowNull: true, // Make passportPhoto nullable
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    indexes: [
        {
            unique: true,
            fields: ['email', 'usn'] // Create a composite index on email and usn
        }
    ]
});
