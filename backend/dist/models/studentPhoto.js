"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentPhoto = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class StudentPhoto extends sequelize_1.Model {
}
exports.StudentPhoto = StudentPhoto;
StudentPhoto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Ensure this matches your users table name
            key: 'id',
        },
    },
    photo: {
        type: sequelize_1.DataTypes.BLOB('long'), // Use BLOB type for binary data
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'student_photos',
});
