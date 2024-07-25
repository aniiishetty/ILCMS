import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

interface AicteInternAttributes {
  id: number;
  email: string;
  phoneNumber: string;
  fullName: string;
  homeAddress: string;
  rollNumber: string;
  academicConcentration: string;
  overallGPA: string;
  semester: string;
  academicYear: string;
  schoolName: string;
  schoolCityState: string;
  campusAddress: string;
  campusPhoneNumber: string;
  campusFaxNumber: string;
  schoolEmail: string;
  hodName: string;
  hodEmail: string;
  resume: Buffer | null;
  internshipPreferences: string;
  learningObjectives: string;
  technicalSkills: string;
  internshipActivities: string;
  evidenceToFaculty: string;
  userId: number; // Foreign key to User
}

interface AicteInternCreationAttributes extends Optional<AicteInternAttributes, 'id'> {}

class AicteIntern extends Model<AicteInternAttributes, AicteInternCreationAttributes> implements AicteInternAttributes {
  public id!: number;
  public email!: string;
  public phoneNumber!: string;
  public fullName!: string;
  public homeAddress!: string;
  public rollNumber!: string;
  public academicConcentration!: string;
  public overallGPA!: string;
  public semester!: string;
  public academicYear!: string;
  public schoolName!: string;
  public schoolCityState!: string;
  public campusAddress!: string;
  public campusPhoneNumber!: string;
  public campusFaxNumber!: string;
  public schoolEmail!: string;
  public hodName!: string;
  public hodEmail!: string;
  public resume!: Buffer | null;
  public internshipPreferences!: string;
  public learningObjectives!: string;
  public technicalSkills!: string;
  public internshipActivities!: string;
  public evidenceToFaculty!: string;
  public userId!: number;

  // Define associations
  static associate(models: any) {
    AicteIntern.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

AicteIntern.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rollNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicConcentration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overallGPA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    academicYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolCityState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campusAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campusPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campusFaxNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hodEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    internshipPreferences: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    learningObjectives: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technicalSkills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    internshipActivities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evidenceToFaculty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'aicte_interns',
  }
);

export { AicteIntern };
