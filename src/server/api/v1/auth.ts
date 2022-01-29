import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'


export const userAuthentication = async (request: Request) => {

    const {
        email,
        password
    } = request.payload as any;

    const user = await User.scope('withPassword').findOne({
        where: {
            email
        }
    });

    if (!user) {
        return error(Errors.NotFound, 'User not found', {});
    }

    if (!user.passwordCompare(password)) {
        return error(Errors.InvalidPayload, 'Password was entered incorrectly', {});
    }

    const sessionNew = await Session.newSession(user.id);

    const token = generateJwt(sessionNew);

    return output({
        access: token.access
    })
}

export const userRegistration = async (request: Request) => {

    const {
        email,
        username
    } = request.payload as any;

    const userFound = await User.findOne({
        where: {
            email
        }
    });

    if (!userFound) {
        await User.createUser(request.payload);

        return output({
            username
        })
    }

    return error(Errors.InvalidPayload, 'User already exists', {})
}

