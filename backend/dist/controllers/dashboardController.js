"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardRole = exports.getFacultyDashboard = exports.getManagementDashboard = exports.getInternshipDashboard = exports.getFinanceDashboard = void 0;
const isJwtPayloadWithRoleId = (admin) => {
    return admin.roleId !== undefined;
};
const getFinanceDashboard = (req, res) => {
    console.log('Finance Dashboard - req.admin:', req.admin);
    if (!req.admin) {
        return res.status(403).send('Access denied');
    }
    if (isJwtPayloadWithRoleId(req.admin)) {
        if (req.admin.roleId !== 1) {
            return res.status(403).send('Access denied');
        }
        res.send('Finance Admin Dashboard - New Payment');
    }
    else {
        return res.status(403).send('Access denied');
    }
};
exports.getFinanceDashboard = getFinanceDashboard;
const getInternshipDashboard = (req, res) => {
    console.log('Internship Dashboard - req.admin:', req.admin);
    if (!req.admin) {
        return res.status(403).send('Access denied');
    }
    if (isJwtPayloadWithRoleId(req.admin)) {
        if (req.admin.roleId !== 2) {
            return res.status(403).send('Access denied');
        }
        res.send('Internship Facilitator Dashboard - Total Students');
    }
    else {
        return res.status(403).send('Access denied');
    }
};
exports.getInternshipDashboard = getInternshipDashboard;
const getManagementDashboard = (req, res) => {
    console.log('Management Dashboard - req.admin:', req.admin);
    if (!req.admin) {
        return res.status(403).send('Access denied');
    }
    if (isJwtPayloadWithRoleId(req.admin)) {
        if (req.admin.roleId !== 3) {
            return res.status(403).send('Access denied');
        }
        res.send('Management Admin Dashboard - All');
    }
    else {
        return res.status(403).send('Access denied');
    }
};
exports.getManagementDashboard = getManagementDashboard;
const getFacultyDashboard = (req, res) => {
    console.log('Faculty Dashboard - req.admin:', req.admin);
    if (!req.admin) {
        return res.status(403).send('Access denied');
    }
    if (isJwtPayloadWithRoleId(req.admin)) {
        if (req.admin.roleId !== 4) {
            return res.status(403).send('Access denied');
        }
        res.send('Faculty Dashboard - Attendance - Daily Logs');
    }
    else {
        return res.status(403).send('Access denied');
    }
};
exports.getFacultyDashboard = getFacultyDashboard;
const getDashboardRole = (req, res) => {
    if (!req.admin) {
        return res.status(403).send('Access denied');
    }
    res.json({ roleId: req.admin.roleId });
};
exports.getDashboardRole = getDashboardRole;
