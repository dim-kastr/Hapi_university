import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { error, } from './index';
import { Session, } from '../models/Session';
import { Errors, } from './errors';

interface IGenerateJWT {
    id: string,
    userId: string
}

export const generateJwt = (data: IGenerateJWT) => {
    const access = jwt.sign({ id: data.id, userId: data.userId }, config.auth.jwt.access.secret, { expiresIn: config.auth.jwt.access.lifetime, });
    return { access };
};

export const decodeJwt = async (token: string, secret: string) => {
    try {
        return await jwt.verify(token, secret);
    } catch (e) {
        const code = e.name === 'TokenExpiredError' ? Errors.TokenExpired : Errors.TokenInvalid;
        const msg = e.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid';
        throw error(code, msg, {});
    }
};

export type validateFunc = (r, token: string) => Promise<any>;

export function tokenValidate(tokenType: 'access' | 'refresh'): validateFunc {
    return async function (r, token: string) {
        const data = await decodeJwt(token, config.auth.jwt[tokenType].secret);

        const { user } = await Session.findByPk(data.id, {
            include: ['user'],
        });

        if (user) {
            return { isValid: true, credentials: user, artifacts: { token, type: tokenType, }, };
        }

        throw error(Errors.SessionNotFound, 'User not found', {});

    };
}