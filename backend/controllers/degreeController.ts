import { Request, Response } from 'express';
import { DegreeStatus } from '../models/DegreeStatus';
import { BranchModel } from '../models/BranchModel';

// Fetch degree statuses by degree ID
export const fetchDegreeStatusesByDegree = async (req: Request, res: Response) => {
  try {
    const { degreeId } = req.query;

    if (!degreeId || typeof degreeId !== 'string') {
      return res.status(400).json({ message: 'Degree ID is required and must be a string' });
    }

    // Fetch degree statuses from the database
    const degreeStatuses = await DegreeStatus.findAll({
      where: { degreeId }
    });

    res.status(200).json(degreeStatuses);
  } catch (error) {
    console.error('Error fetching degree statuses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch branches by degree ID
export const fetchBranchesByDegree = async (req: Request, res: Response) => {
  try {
    const { degreeId } = req.query;

    if (!degreeId || typeof degreeId !== 'string') {
      return res.status(400).json({ message: 'Degree ID is required and must be a string' });
    }

    // Fetch branches from the database
    const branches = await BranchModel.findAll({
      where: { degreeId }
    });

    res.status(200).json(branches);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
