import { Sequelize } from 'sequelize';
import sequelize from '../config/database'; // Assuming sequelize is properly configured in this file
import { Admin } from './admin'; // Importing Admin model from ./admin
import { User } from './user'; // Importing User model from ./user
import { StudentPhoto } from './studentPhoto'; // Importing StudentPhoto model
import { AicteIntern } from './aicteIntern'; // Importing AicteIntern model



// Initialize models
const connectDB = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    User.associate({ AicteIntern });
AicteIntern.associate({ User });

    // Initialize models
    // (Models are already imported, so they are initialized when Sequelize.sync() is called)

    // Define model associations
    

    // Sync the database models with { alter: true } to adjust schema without dropping tables
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Exporting the connection function and models
export { connectDB, Admin, User, StudentPhoto, AicteIntern };
