// backend/models/Role.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Role extends Model {
    public id!: number;
    public roleName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'roles',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default Role;
