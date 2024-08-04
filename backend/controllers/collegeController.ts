import { Request, Response } from 'express';
import { College } from '../models/Colleges';
import { Degree } from '../models/Degree';
import { BranchModel } from '../models/BranchModel';
import { DegreeStatus } from '../models/DegreeStatus';

// Fetch all colleges
export const fetchColleges = async (req: Request, res: Response) => {
  try {
    const colleges = await College.findAll();
    res.status(200).json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch all degrees
export const fetchDegrees = async (req: Request, res: Response) => {
  try {
    const degrees = await Degree.findAll();
    res.status(200).json(degrees);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch all branches
export const fetchBranches = async (req: Request, res: Response) => {
  try {
    const branches = await BranchModel.findAll();
    res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch all degree statuses
export const fetchDegreeStatuses = async (req: Request, res: Response) => {
  try {
    const degreeStatuses = await DegreeStatus.findAll();
    res.status(200).json(degreeStatuses);
  } catch (error) {
    console.error('Error fetching degree statuses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
