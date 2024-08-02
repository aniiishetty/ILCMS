// BranchModel.js
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Degree } from './Degree';

interface BranchAttributes {
  BranchID: number;
  BranchName: string;
  degreeId?: number;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, 'BranchID'> {}

class BranchModel extends Model<BranchAttributes, BranchCreationAttributes> implements BranchAttributes {
  public BranchID!: number;
  public BranchName!: string;
  public degreeId?: number;

  public BranchDegree?: Degree; // Renamed the association
}

BranchModel.init(
  {
    BranchID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    BranchName: {
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
    tableName: 'Branches',
    timestamps: true,
  }
);

BranchModel.belongsTo(Degree, { foreignKey: 'degreeId', as: 'BranchDegree' }); // Updated the alias

export { BranchModel };