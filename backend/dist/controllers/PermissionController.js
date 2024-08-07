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
exports.deletePermission = exports.updatePermission = exports.getPermissions = exports.createPermission = void 0;
const Permission_1 = __importDefault(require("../models/Permission"));
const createPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const permission = yield Permission_1.default.create({ name });
        res.status(201).json({ message: 'Permission created successfully', permission });
    }
    catch (err) {
        console.error('Error creating permission:', err);
        res.status(500).json({ error: 'Permission creation failed' });
    }
});
exports.createPermission = createPermission;
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissions = yield Permission_1.default.findAll();
        res.json(permissions);
    }
    catch (err) {
        console.error('Error fetching permissions:', err);
        res.status(500).json({ error: 'Failed to fetch permissions' });
    }
});
exports.getPermissions = getPermissions;
const updatePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const permission = yield Permission_1.default.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        permission.name = name;
        yield permission.save();
        res.json({ message: 'Permission updated successfully', permission });
    }
    catch (err) {
        console.error('Error updating permission:', err);
        res.status(500).json({ error: 'Permission update failed' });
    }
});
exports.updatePermission = updatePermission;
const deletePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const permission = yield Permission_1.default.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        yield permission.destroy();
        res.json({ message: 'Permission deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting permission:', err);
        res.status(500).json({ error: 'Permission deletion failed' });
    }
});
exports.deletePermission = deletePermission;
