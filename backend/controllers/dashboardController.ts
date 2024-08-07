import { Request, Response } from 'express';

interface AdminRequest extends Request {
  admin?: {
    roleId: number;
    adminId: number;
  };
}

const isJwtPayloadWithRoleId = (
  admin: unknown
): admin is { roleId: number; adminId: number } => {
  return (admin as { roleId: number; adminId: number }).roleId !== undefined;
};

export const getFinanceDashboard = (req: AdminRequest, res: Response) => {
  console.log('Finance Dashboard - req.admin:', req.admin);
  if (!req.admin) {
    return res.status(403).send('Access denied');
  }

  if (isJwtPayloadWithRoleId(req.admin)) {
    if (req.admin.roleId !== 1) {
      return res.status(403).send('Access denied');
    }
    res.send('Finance Admin Dashboard - New Payment');
  } else {
    return res.status(403).send('Access denied');
  }
};

export const getInternshipDashboard = (req: AdminRequest, res: Response) => {
  console.log('Internship Dashboard - req.admin:', req.admin);
  if (!req.admin) {
    return res.status(403).send('Access denied');
  }

  if (isJwtPayloadWithRoleId(req.admin)) {
    if (req.admin.roleId !== 2) {
      return res.status(403).send('Access denied');
    }
    res.send('Internship Facilitator Dashboard - Total Students');
  } else {
    return res.status(403).send('Access denied');
  }
};

export const getManagementDashboard = (req: AdminRequest, res: Response) => {
  console.log('Management Dashboard - req.admin:', req.admin);
  if (!req.admin) {
    return res.status(403).send('Access denied');
  }

  if (isJwtPayloadWithRoleId(req.admin)) {
    if (req.admin.roleId !== 3) {
      return res.status(403).send('Access denied');
    }
    res.send('Management Admin Dashboard - All');
  } else {
    return res.status(403).send('Access denied');
  }
};

export const getFacultyDashboard = (req: AdminRequest, res: Response) => {
  console.log('Faculty Dashboard - req.admin:', req.admin);
  if (!req.admin) {
    return res.status(403).send('Access denied');
  }

  if (isJwtPayloadWithRoleId(req.admin)) {
    if (req.admin.roleId !== 4) {
      return res.status(403).send('Access denied');
    }
    res.send('Faculty Dashboard - Attendance - Daily Logs');
  } else {
    return res.status(403).send('Access denied');
  }
};

export const getDashboardRole = (req: AdminRequest, res: Response) => {
  if (!req.admin) {
    return res.status(403).send('Access denied');
  }

  res.json({ roleId: req.admin.roleId });
};
