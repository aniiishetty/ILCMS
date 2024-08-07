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
exports.deleteRole = exports.updateRole = exports.getRoles = exports.createRole = void 0;
const Role_1 = __importDefault(require("../models/Role"));
const Permission_1 = __importDefault(require("../models/Permission"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, permissions } = req.body;
    try {
        const role = yield Role_1.default.create({ name });
        if (permissions) {
            yield role.setPermissions(permissions);
        }
        res.status(201).json({ message: 'Role created successfully', role });
    }
    catch (err) {
        console.error('Error creating role:', err);
        res.status(500).json({ error: 'Role creation failed' });
    }
});
exports.createRole = createRole;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.default.findAll({ include: [Permission_1.default] });
        res.json(roles);
    }
    catch (err) {
        console.error('Error fetching roles:', err);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});
exports.getRoles = getRoles;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        role.name = name;
        yield role.save();
        if (permissions) {
            yield role.setPermissions(permissions);
        }
        res.json({ message: 'Role updated successfully', role });
    }
    catch (err) {
        console.error('Error updating role:', err);
        res.status(500).json({ error: 'Role update failed' });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        yield role.destroy();
        res.json({ message: 'Role deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting role:', err);
        res.status(500).json({ error: 'Role deletion failed' });
    }
});
exports.deleteRole = deleteRole;
