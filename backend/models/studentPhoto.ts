import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StudentPhotoAttributes {
  id: number;
  userId: number; // Foreign key to User
  photo: Buffer; // Binary data for the photo
}

interface StudentPhotoCreationAttributes extends Optional<StudentPhotoAttributes, 'id'> {}

class StudentPhoto extends Model<StudentPhotoAttributes, StudentPhotoCreationAttributes> implements StudentPhotoAttributes {
  public id!: number;
  public userId!: number;
  public photo!: Buffer; // Store photo as binary data
}

StudentPhoto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Ensure this matches your users table name
        key: 'id',
      },
    },
    photo: {
      type: DataTypes.BLOB('long'), // Use BLOB type for binary data
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'student_photos',
  }
);

export { StudentPhoto };
