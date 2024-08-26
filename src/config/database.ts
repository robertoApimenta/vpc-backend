import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'l1IYOR9AolHJ1o3pSc6K', {
    host: '54.157.133.160',
    dialect: 'postgres',
});

export default sequelize;
