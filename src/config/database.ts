import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'l1IYOR9AolHJ1o3pSc6K', {
    host: 'vaiparacontaprod01.cfm4ams0261o.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: { //< Add this
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default sequelize;
