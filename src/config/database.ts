import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'Vaipraconta!#', {
    host: 'vaipraconta.cfm4ams0261o.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
});

export default sequelize;
