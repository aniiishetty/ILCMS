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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreScreening = exports.createPreScreening = void 0;
const PreScreening_1 = require("../models/PreScreening");
const user_1 = require("../models/user");
const createPreScreening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        const { tenthBoard, tenthYear, tenthPercentage, twelfthBoard, twelfthYear, twelfthPercentage, degreeUniversity, degreeLastSemResult, userId } = req.body;
        if (!userId) {
            console.error('User ID not provided');
            return res.status(400).json({ message: 'User ID is required' });
        }
        const tenthDocument = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.tenthDocument) === null || _b === void 0 ? void 0 : _b.data) || null;
        const twelfthDocument = ((_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.twelfthDocument) === null || _d === void 0 ? void 0 : _d.data) || null;
        const degreeResultFile = ((_f = (_e = req.files) === null || _e === void 0 ? void 0 : _e.degreeResultFile) === null || _f === void 0 ? void 0 : _f.data) || null;
        console.log('Extracted documents:', {
            tenthDocument,
            twelfthDocument,
            degreeResultFile
        });
        if (tenthDocument && tenthDocument.length > 16777215) {
            return res.status(400).json({ message: 'Tenth document file size is too large' });
        }
        if (twelfthDocument && twelfthDocument.length > 16777215) {
            return res.status(400).json({ message: 'Twelfth document file size is too large' });
        }
        if (degreeResultFile && degreeResultFile.length > 16777215) {
            return res.status(400).json({ message: 'Degree result file size is too large' });
        }
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }
        const newPreScreening = {
            tenthBoard,
            tenthYear,
            tenthPercentage,
            tenthDocument: tenthDocument || Buffer.from(''),
            twelfthBoard,
            twelfthYear,
            twelfthPercentage,
            twelfthDocument: twelfthDocument || Buffer.from(''),
            degreeUniversity,
            degreeLastSemResult,
            degreeResultFile: degreeResultFile || Buffer.from(''),
            userId,
        };
        console.log('PreScreening data to be created:', newPreScreening);
        const preScreening = yield PreScreening_1.PreScreening.create(newPreScreening);
        console.log('PreScreening created successfully:', preScreening);
        res.status(201).json({ message: 'Pre-screening created successfully', preScreening });
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Validation error:', error.errors);
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('Unique constraint error:', error.errors);
            return res.status(409).json({ message: 'Unique constraint error', errors: error.errors });
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            console.error('Foreign key constraint error:', error.errors);
            return res.status(400).json({ message: 'Foreign key constraint error', errors: error.errors });
        }
        console.error('Error creating pre-screening:', error);
        res.status(500).json({ message: 'Error creating pre-screening', error });
    }
});
exports.createPreScreening = createPreScreening;
const getPreScreening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preScreenings = yield PreScreening_1.PreScreening.findAll({
            attributes: {
                exclude: ['userId'], // Exclude userId from pre-screening data
            },
            include: [
                {
                    model: user_1.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'], // Include only necessary user details
                },
            ],
        });
        res.status(200).json(preScreenings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving pre-screening data', error });
    }
});
exports.getPreScreening = getPreScreening;
