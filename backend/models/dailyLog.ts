import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { AicteIntern } from './aicteIntern';

interface DailyLogAttributes {
  id: number;
  day: string;
  date: Date;
  arrivalTime: string;
  departureTime: string;
  remarks?: string;
  department: string;
  finishedProduct: string;
  hodName: string;
  hodEmail: string;
  mainPoints: string;
  userId: number; // Foreign key to User
  aicteInternId?: number; // Optional foreign key to AicteIntern
}

interface DailyLogCreationAttributes extends Optional<DailyLogAttributes, 'id' | 'aicteInternId'> {}

class DailyLog extends Model<DailyLogAttributes, DailyLogCreationAttributes> implements DailyLogAttributes {
  public id!: number;
  public day!: string;
  public date!: Date;
  public arrivalTime!: string;
  public departureTime!: string;
  public remarks?: string;
  public department!: string;
  public finishedProduct!: string;
  public hodName!: string;
  public hodEmail!: string;
  public mainPoints!: string;
  public userId!: number;
  public aicteInternId?: number;

  // Define associations
  static associate(models: any) {
    DailyLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    DailyLog.belongsTo(models.AicteIntern, { foreignKey: 'aicteInternId', as: 'aicteIntern' });
  }
}

DailyLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finishedProduct: {
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
    mainPoints: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aicteInternId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Make aicteInternId optional
    },
  },
  {
    sequelize,
    tableName: 'daily_logs',
  }
);

export { DailyLog };