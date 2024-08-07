import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the import path as necessary

// Define the attributes for the model
interface DegreeAttributes {
  id: number;
  DegreeName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes (optional fields)
interface DegreeCreationAttributes extends Optional<DegreeAttributes,  'id'> {}

// Define the model class
class Degree extends Model<DegreeAttributes, DegreeCreationAttributes> implements DegreeAttributes {
  public id!: number;
  public DegreeName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
Degree.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DegreeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Degrees',
    timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
  }
);

export { Degree };