import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';
import { StudentPhoto } from './studentPhoto';
import { AicteIntern } from './aicteIntern';
import { College } from './Colleges';
import { InternshipModel } from './InternshipModel';
import { Degree } from './Degree';
import { BranchModel } from './BranchModel';
import { DegreeStatus } from './DegreeStatus';
import Role from './Role';
import Admin from './Admin';
import { Payment } from './payment';
import { PreScreening } from './PreScreening';
import { DailyLog } from './dailyLog';

// Initialize models
// Initialize models
const connectDB = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Define model associations
    User.hasOne(AicteIntern, { foreignKey: 'userId', as: 'aicteIntern' });
    AicteIntern.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  

    
   
    

   
   

    // Sync the database models with { alter: true } to adjust schema without dropping tables
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
// Exporting the connection function and models
export { connectDB, User, StudentPhoto, AicteIntern, College, InternshipModel, Degree, BranchModel, DegreeStatus, Role, Admin, Payment,PreScreening,DailyLog };
