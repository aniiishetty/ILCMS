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
exports.DegreeStatus = exports.BranchModel = exports.Degree = exports.InternshipModel = exports.College = exports.AicteIntern = exports.StudentPhoto = exports.User = exports.Admin = exports.connectDB = void 0;
const database_1 = __importDefault(require("../config/database"));
const admin_1 = require("./admin");
Object.defineProperty(exports, "Admin", { enumerable: true, get: function () { return admin_1.Admin; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const studentPhoto_1 = require("./studentPhoto");
Object.defineProperty(exports, "StudentPhoto", { enumerable: true, get: function () { return studentPhoto_1.StudentPhoto; } });
const aicteIntern_1 = require("./aicteIntern");
Object.defineProperty(exports, "AicteIntern", { enumerable: true, get: function () { return aicteIntern_1.AicteIntern; } });
const Colleges_1 = require("./Colleges");
Object.defineProperty(exports, "College", { enumerable: true, get: function () { return Colleges_1.College; } });
const InternshipModel_1 = require("./InternshipModel");
Object.defineProperty(exports, "InternshipModel", { enumerable: true, get: function () { return InternshipModel_1.InternshipModel; } });
const Degree_1 = require("./Degree");
Object.defineProperty(exports, "Degree", { enumerable: true, get: function () { return Degree_1.Degree; } });
const BranchModel_1 = require("./BranchModel");
Object.defineProperty(exports, "BranchModel", { enumerable: true, get: function () { return BranchModel_1.BranchModel; } });
const DegreeStatus_1 = require("./DegreeStatus");
Object.defineProperty(exports, "DegreeStatus", { enumerable: true, get: function () { return DegreeStatus_1.DegreeStatus; } });
// Initialize models
// Initialize models
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Authenticate the connection
        yield database_1.default.authenticate();
        console.log('Connection has been established successfully.');
        // Define model associations
        user_1.User.hasOne(aicteIntern_1.AicteIntern, { foreignKey: 'userId', as: 'aicteIntern' });
        aicteIntern_1.AicteIntern.belongsTo(user_1.User, { foreignKey: 'userId', as: 'user' });
        // Sync the database models with { alter: true } to adjust schema without dropping tables
        yield database_1.default.sync({ alter: true });
        console.log('Database synced');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.connectDB = connectDB;
