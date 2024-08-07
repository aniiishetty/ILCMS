import { Request, Response } from 'express';
import { PreScreening, PreScreeningCreationAttributes } from '../models/PreScreening';
import { User } from '../models/user';
import { UploadedFile } from 'express-fileupload';

export const createPreScreening = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const {
      tenthBoard,
      tenthYear,
      tenthPercentage,
      twelfthBoard,
      twelfthYear,
      twelfthPercentage,
      degreeUniversity,
      degreeLastSemResult,
      userId
    } = req.body;

    if (!userId) {
      console.error('User ID not provided');
      return res.status(400).json({ message: 'User ID is required' });
    }

    const tenthDocument = (req.files as unknown as { [fieldname: string]: UploadedFile })?.tenthDocument?.data || null;
    const twelfthDocument = (req.files as unknown as { [fieldname: string]: UploadedFile })?.twelfthDocument?.data || null;
    const degreeResultFile = (req.files as unknown as { [fieldname: string]: UploadedFile })?.degreeResultFile?.data || null;

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

    const user = await User.findByPk(userId);
    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    const newPreScreening: PreScreeningCreationAttributes = {
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

    const preScreening = await PreScreening.create(newPreScreening);

    console.log('PreScreening created successfully:', preScreening);

    res.status(201).json({ message: 'Pre-screening created successfully', preScreening });
  } catch (error) {
    if ((error as any).name === 'SequelizeValidationError') {
      console.error('Validation error:', (error as any).errors);
      return res.status(400).json({ message: 'Validation error', errors: (error as any).errors });
    }

    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      console.error('Unique constraint error:', (error as any).errors);
      return res.status(409).json({ message: 'Unique constraint error', errors: (error as any).errors });
    }

    if ((error as any).name === 'SequelizeForeignKeyConstraintError') {
      console.error('Foreign key constraint error:', (error as any).errors);
      return res.status(400).json({ message: 'Foreign key constraint error', errors: (error as any).errors });
    }

    console.error('Error creating pre-screening:', error);
    res.status(500).json({ message: 'Error creating pre-screening', error });
  }
};
export const getPreScreening = async (req: Request, res: Response) => {
  try {
    const preScreenings = await PreScreening.findAll({
      attributes: {
        exclude: ['userId'], // Exclude userId from pre-screening data
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'], // Include only necessary user details
        },
      ],
    });
    res.status(200).json(preScreenings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pre-screening data', error });
  }
};