"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = require("./user");
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    paymentMode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    utrNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    referenceFile: {
        type: sequelize_1.DataTypes.BLOB('long'),
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id',
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'verified', 'declined'),
        defaultValue: 'pending',
    },
}, {
    sequelize: database_1.default,
    tableName: 'payments',
    timestamps: true,
});
Payment.belongsTo(user_1.User, { foreignKey: 'userId', as: 'user' });
