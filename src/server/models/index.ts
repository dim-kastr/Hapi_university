import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { User } from './User';
import { Session } from './Session';


let hapiPro: Sequelize;
/**
 * 
 * Connecting the database
 * 
 */
export const dbInit = async () => {
    const hapiPro = new Sequelize(config.dbLink, {
        dialect: 'postgres',
        models: [User, Session],
        define: {
            freezeTableName: true
        }
    });

    await hapiPro.sync();
}

export default hapiPro;