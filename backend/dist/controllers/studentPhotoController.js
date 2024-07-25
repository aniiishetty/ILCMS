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
exports.deletePhotoByUserId = exports.getPhotoByUserId = exports.uploadPhoto = void 0;
const studentPhoto_1 = require("../models/studentPhoto");
const user_1 = require("../models/user");
const multer_1 = __importDefault(require("multer"));
// Configure multer for file uploads
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const uploadPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    const userId = req.body.userId || req.body.id; // Handle both 'userId' and 'id'
    if (!req.file || !userId) {
        return res.status(400).send('No file uploaded or user ID missing.');
    }
    try {
        const photo = req.file.buffer; // Binary data of the photo
        // Ensure the user exists
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        // Create or update the student photo
        yield studentPhoto_1.StudentPhoto.upsert({
            userId,
            photo,
        });
        res.send('Photo uploaded successfully.');
    }
    catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).send('An error occurred while uploading the photo.');
    }
});
exports.uploadPhoto = uploadPhoto;
const getPhotoByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const studentPhoto = yield studentPhoto_1.StudentPhoto.findOne({ where: { userId } });
        if (!studentPhoto) {
            return res.status(404).send('Photo not found.');
        }
        res.set('Content-Type', 'image/jpeg'); // Adjust according to the image type
        res.send(studentPhoto.photo); // Send photo binary data
    }
    catch (error) {
        console.error('Error retrieving photo:', error);
        res.status(500).send('An error occurred while retrieving the photo.');
    }
});
exports.getPhotoByUserId = getPhotoByUserId;
const deletePhotoByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const studentPhoto = yield studentPhoto_1.StudentPhoto.findOne({ where: { userId } });
        if (!studentPhoto) {
            return res.status(404).send('Photo not found.');
        }
        yield studentPhoto.destroy();
        res.send('Photo deleted successfully.');
    }
    catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).send('An error occurred while deleting the photo.');
    }
});
exports.deletePhotoByUserId = deletePhotoByUserId;
