import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust the import path as necessary

// Define the attributes for the model
interface InternshipAttributes {
  id: number;
  name: 'GraduatesWithin2Years' | 'FourToSixSemester' | 'SevenToEightSemester';
  graduationYear?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes (optional fields)
interface InternshipCreationAttributes extends Optional<InternshipAttributes, 'id'> {}

// Define the model class
class InternshipModel extends Model<InternshipAttributes, InternshipCreationAttributes> implements InternshipAttributes {
  public id!: number;
  public name!: 'GraduatesWithin2Years' | 'FourToSixSemester' | 'SevenToEightSemester';
  public graduationYear?: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
InternshipModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM('GraduatesWithin2Years', 'FourToSixSemester', 'SevenToEightSemester'),
      allowNull: false,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        // No need for onUpdate option
      },
  },
  {
    sequelize,
    tableName: 'InternshipModel',
    timestamps: true, // Automatically manages `createdAt` and `updatedAt` fields
  }
);

export { InternshipModel };
