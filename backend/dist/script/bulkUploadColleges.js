"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Colleges_1 = require("../models/Colleges"); // Adjust the path to your model
const XLSX = __importStar(require("xlsx"));
const database_1 = __importDefault(require("../config/database")); // Adjust the path to your Sequelize instance
function bulkUploadColleges(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // Filter out records with missing or invalid fields
        const collegesData = jsonData
            .map((data) => {
            var _a, _b;
            return ({
                code: (_a = data['College Code']) === null || _a === void 0 ? void 0 : _a.trim(),
                name: (_b = data['College Name']) === null || _b === void 0 ? void 0 : _b.trim(),
            });
        })
            .filter((data) => data.code && data.name); // Ensure code and name are not null or empty
        if (collegesData.length === 0) {
            console.log('No valid data found for upload.');
            return;
        }
        // Bulk create colleges in the database
        try {
            yield Colleges_1.College.bulkCreate(collegesData, {
                validate: true,
                updateOnDuplicate: ['name'] // Ensure duplicates are handled properly
            });
            console.log('Bulk upload successful');
        }
        catch (error) {
            console.error('Error during bulk upload:', error);
        }
    });
}
// Run the bulk upload function
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync(); // Ensure the database is synchronized
        yield bulkUploadColleges('data/colleges.xlsx'); // Adjust the path to your Excel file
    }
    catch (error) {
        console.error('Error during bulk upload execution:', error);
    }
}))();
