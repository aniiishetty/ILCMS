import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CollegeAttributes {
  id: number;
  name: string;
  code: string;
  Active_Status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CollegeCreationAttributes extends Optional<CollegeAttributes, 'id'> {}

class College extends Model<CollegeAttributes, CollegeCreationAttributes> implements CollegeAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  Active_Status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

College.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // Remove the unique constraint from the name field
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that code is unique across the table
    },
    Active_Status: {
        type: DataTypes.STRING,
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
    tableName: 'colleges',
    timestamps: true, // Ensure timestamps are enabled
    indexes: [
      {
        unique: true,
        fields: ['code'], // Ensure uniqueness for code
      },
    ],
  }
);

export { College };
