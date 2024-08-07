import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';

interface PaymentAttributes {
  id: number;
  name: string;
  paymentMode: string;
  utrNo: string;
  referenceFile: Buffer;
  userId: number;
  status: 'pending' | 'verified' | 'declined'; // Add status field
}

type PaymentCreationAttributes = Optional<PaymentAttributes, 'id'>;

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public name!: string;
  public paymentMode!: string;
  public utrNo!: string;
  public referenceFile!: Buffer;
  public userId!: number;
  public status!: 'pending' | 'verified' | 'declined'; // Add status field
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    utrNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceFile: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'declined'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
  }
);

Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Payment, PaymentCreationAttributes };
