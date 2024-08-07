"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyLog = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class DailyLog extends sequelize_1.Model {
    static find(p0) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndUpdate(id, arg1, arg2) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndRemove(id) {
        throw new Error('Method not implemented.');
    }
    // Define associations
    static associate(models) {
        DailyLog.hasOne(models.User, { foreignKey: 'userId', as: 'user' });
        DailyLog.hasOne(models.AicteIntern, { foreignKey: 'aicteInternId', as: 'aicteIntern' });
        DailyLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        DailyLog.belongsTo(models.AicteIntern, { foreignKey: 'aicteInternId', as: 'aicteIntern' });
    }
}
exports.DailyLog = DailyLog;
DailyLog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    day: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    arrivalTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    departureTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    remarks: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    finishedProduct: {
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
    mainPoints: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    aicteInternId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Make aicteInternId optional
    },
}, {
    sequelize: database_1.default,
    tableName: 'daily_logs',
});
