import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { User } from './User';
import { Session } from './Session';
import { University } from './University';
import { Profile } from './Profile';


export const dbInit = async () => {
    const sequelize = new Sequelize(config.dbLink, {
        dialect: 'postgres',
        models: [User, Session, University, Profile],
        define: {
            freezeTableName: true
        }
    });

    await sequelize.sync();
}