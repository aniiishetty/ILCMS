// models/PreScreening.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

interface PreScreeningAttributes {
  id: number;
  tenthBoard: string;
  tenthYear: string;
  tenthPercentage: string;
  tenthDocument: Buffer;
  twelfthBoard: string;
  twelfthYear: string;
  twelfthPercentage: string;
  twelfthDocument: Buffer;
  degreeUniversity: string;
  degreeLastSemResult: string;
  degreeResultFile: Buffer;
  userId: number;
}

type PreScreeningCreationAttributes = Optional<PreScreeningAttributes, 'id'>

class PreScreening extends Model<PreScreeningAttributes, PreScreeningCreationAttributes> implements PreScreeningAttributes {
  public id!: number;
  public tenthBoard!: string;
  public tenthYear!: string;
  public tenthPercentage!: string;
  public tenthDocument!: Buffer;
  public twelfthBoard!: string;
  public twelfthYear!: string;
  public twelfthPercentage!: string;
  public twelfthDocument!: Buffer;
  public degreeUniversity!: string;
  public degreeLastSemResult!: string;
  public degreeResultFile!: Buffer;
  public userId!: number;
}

PreScreening.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tenthBoard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenthYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenthPercentage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenthDocument: {
      type: DataTypes.BLOB('long'), // Change to BLOB('long')
      allowNull: false,
    },
    twelfthBoard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twelfthYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twelfthPercentage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twelfthDocument: {
      type: DataTypes.BLOB('long'), // Change to BLOB('long')
      allowNull: false,
    },
    degreeUniversity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degreeLastSemResult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degreeResultFile: {
      type: DataTypes.BLOB('long'), // Change to BLOB('long')
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'prescreenings',
    timestamps: true,
  }
);

PreScreening.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { PreScreening, PreScreeningCreationAttributes };
