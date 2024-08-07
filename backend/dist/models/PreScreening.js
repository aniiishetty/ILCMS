"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreScreening = void 0;
// models/PreScreening.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = require("./user");
class PreScreening extends sequelize_1.Model {
}
exports.PreScreening = PreScreening;
PreScreening.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    tenthBoard: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tenthYear: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tenthPercentage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tenthDocument: {
        type: sequelize_1.DataTypes.BLOB('long'), // Change to BLOB('long')
        allowNull: false,
    },
    twelfthBoard: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    twelfthYear: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    twelfthPercentage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    twelfthDocument: {
        type: sequelize_1.DataTypes.BLOB('long'), // Change to BLOB('long')
        allowNull: false,
    },
    degreeUniversity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    degreeLastSemResult: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    degreeResultFile: {
        type: sequelize_1.DataTypes.BLOB('long'), // Change to BLOB('long')
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.User,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'prescreenings',
    timestamps: true,
});
PreScreening.belongsTo(user_1.User, { foreignKey: 'userId', as: 'user' });
