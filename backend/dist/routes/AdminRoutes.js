"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoleController_1 = require("../controllers/RoleController");
const PermissionController_1 = require("../controllers/PermissionController");
const SuperAdminController_1 = require("../controllers/SuperAdminController");
const router = express_1.default.Router();
// Role routes
router.post('/roles', RoleController_1.createRole);
router.get('/roles', RoleController_1.getRoles);
router.put('/roles/:id', RoleController_1.updateRole);
router.delete('/roles/:id', RoleController_1.deleteRole);
// Permission routes
router.post('/permissions', PermissionController_1.createPermission);
router.get('/permissions', PermissionController_1.getPermissions);
router.put('/permissions/:id', PermissionController_1.updatePermission);
router.delete('/permissions/:id', PermissionController_1.deletePermission);
// SuperAdmin routes
router.post('/superadmins/register', SuperAdminController_1.registerSuperAdmin);
router.post('/superadmins/login', SuperAdminController_1.loginSuperAdmin);
exports.default = router;
