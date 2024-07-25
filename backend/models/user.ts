import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { AicteIntern } from './aicteIntern';

interface UserAttributes {
  id: number;
  Username: string;
  password: string;
  name: string;
  dob: Date;
  address: string;
  collegeName: string;
  university: string;
  usn: string;
  verificationType: 'Aadhar' | 'Passport';
  verificationId: string;
  email: string;
  gender: string;
  branch: string;
  semester: string;
  phoneNumber: string;
  passportPhoto?: Buffer; // Make passportPhoto optional
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'passportPhoto'> {} // Make passportPhoto optional during creation

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public Username!: string;
  public password!: string;
  public name!: string;
  public dob!: Date;
  public address!: string;
  public collegeName!: string;
  public university!: string;
  public usn!: string;
  public verificationType!: 'Aadhar' | 'Passport';
  public verificationId!: string;
  public email!: string;
  public gender!: string;
  public branch!: string;
  public semester!: string;
  public phoneNumber!: string;
  public passportPhoto?: Buffer; // Optional field

  // Define associations
  static associate(models: any) {
    User.hasMany(models.AicteIntern, { foreignKey: 'userId', as: 'aicteInterns' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
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
    collegeName: {
      type: DataTypes.STRING,
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
    verificationType: {
      type: DataTypes.ENUM('Aadhar', 'Passport'),
      allowNull: false,
    },
    verificationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
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
      allowNull: true, // Make passportPhoto nullable
    },
  },
  {
    sequelize,
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['email', 'usn'] // Create a composite index on email and usn
      }
    ]
  }
);
export { User };
