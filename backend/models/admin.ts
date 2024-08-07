// backend/models/Admin.ts
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';
import Role from './Role';

class Admin extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public roleId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Admin.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Role,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'admins',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});



export default Admin;
