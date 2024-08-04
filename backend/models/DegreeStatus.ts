// DegreeStatus.js
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Degree } from './Degree';

interface DegreeStatusAttributes {
  DegreeStatusID: number;
  StatusName: string;
  degreeId?: number; // Allowing degreeId to be optional
}

interface DegreeStatusCreationAttributes extends Optional<DegreeStatusAttributes, 'DegreeStatusID'> {}

class DegreeStatus extends Model<DegreeStatusAttributes, DegreeStatusCreationAttributes> implements DegreeStatusAttributes {
  public DegreeStatusID!: number;
  public StatusName!: string;
  public degreeId?: number; // Allowing degreeId to be optional
}

DegreeStatus.init(
  {
    DegreeStatusID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    StatusName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degreeId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow NULL values
    },
  },
  {
    sequelize,
    tableName: 'DegreeStatus',
    timestamps: true,
  }
);

DegreeStatus.belongsTo(Degree, { foreignKey: 'degreeId', as: 'DegreeStatusDegree' }); // Updated the alias
Degree.hasMany(DegreeStatus, { foreignKey: 'degreeId', as: 'DegreeStatuses' });

export { DegreeStatus };