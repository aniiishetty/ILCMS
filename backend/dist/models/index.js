"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AicteIntern = exports.StudentPhoto = exports.User = exports.Admin = exports.connectDB = void 0;
const database_1 = __importDefault(require("../config/database")); // Assuming sequelize is properly configured in this file
const admin_1 = require("./admin"); // Importing Admin model from ./admin
Object.defineProperty(exports, "Admin", { enumerable: true, get: function () { return admin_1.Admin; } });
const user_1 = require("./user"); // Importing User model from ./user
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const studentPhoto_1 = require("./studentPhoto"); // Importing StudentPhoto model
Object.defineProperty(exports, "StudentPhoto", { enumerable: true, get: function () { return studentPhoto_1.StudentPhoto; } });
const aicteIntern_1 = require("./aicteIntern"); // Importing AicteIntern model
Object.defineProperty(exports, "AicteIntern", { enumerable: true, get: function () { return aicteIntern_1.AicteIntern; } });
// Initialize models
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Authenticate the connection
        yield database_1.default.authenticate();
        console.log('Connection has been established successfully.');
        user_1.User.associate({ AicteIntern: aicteIntern_1.AicteIntern });
        aicteIntern_1.AicteIntern.associate({ User: user_1.User });
        // Initialize models
        // (Models are already imported, so they are initialized when Sequelize.sync() is called)
        // Define model associations
        // Sync the database models with { alter: true } to adjust schema without dropping tables
        yield database_1.default.sync({ alter: true });
        console.log('Database synced');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.connectDB = connectDB;
