import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { AicteIntern } from './aicteIntern';
import { Degree } from './Degree';
import { DegreeStatus } from './DegreeStatus';
import { BranchModel } from './BranchModel';
import { College } from './Colleges';

interface UserAttributes {
  id: number;
  IIMSTC_ID: string;
  password: string;
  name: string;
  dob: Date;
  address: string;
  collegeId: number;
  university: string;
  usn: string;
  email: string;
  gender: string;
  semester: string;
  phoneNumber: string;
  passportPhoto: Buffer;
  aadharNo: string;
  aadharProof: Buffer;
  degreeId: number;
  degreeStatusId: number;
  branchId: number;
  otp?: string | null;
  InternshipApproved: boolean | null; 
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'otp'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public IIMSTC_ID!: string;
  public password!: string;
  public name!: string;
  public dob!: Date;
  public address!: string;
  public collegeId!: number;
  public university!: string;
  public usn!: string;
  public email!: string;
  public gender!: string;
  public semester!: string;
  public phoneNumber!: string;
  public passportPhoto!: Buffer;
  public aadharNo!: string;
  public aadharProof!: Buffer;
  public degreeId!: number;
  public degreeStatusId!: number;
  public branchId!: number;
  public otp!:string;
  public InternshipApproved!: boolean;

  static associate(models: any) {
    User.hasOne(models.AicteIntern, { foreignKey: 'userId', as: 'aicteInterns' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IIMSTC_ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passportPhoto: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    aadharNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadharProof: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    degreeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    degreeStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING, // Store OTP as a string
      allowNull: true, // Allow null when not in use
    },
    InternshipApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      
  },
  },
  {
    sequelize,
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['email', 'IIMSTC_ID'],
      },
    ],
    timestamps: true,
  }
);

// Associations
User.belongsTo(Degree, { foreignKey: 'degreeId', as: 'degreeDetails' });
User.belongsTo(DegreeStatus, { foreignKey: 'degreeStatusId', as: 'degreeStatusDetails' });
User.belongsTo(BranchModel, { foreignKey: 'branchId', as: 'branchDetails' });
User.belongsTo(College, { foreignKey: 'collegeId', as: 'collegeDetails' });


export { User };