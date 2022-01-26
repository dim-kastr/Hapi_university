import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import { error, output } from '../../utils/index';


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
        return error(404, 'User not found', {});
    } // user search

    if (!user.passwordCompare(password)) {
        return error(400, 'Password was entered incorrectly', {});
    } // password verification

    const sessionNew = await Session.newSession(user.id);
    //creating a session 
    const token = generateJwt(sessionNew.dataValues);

    return output({
        access: token.access
    })
}

export const userRegistration = async (request: Request) => {

    const {
        email,
    } = request.payload as any;

    const userFound = await User.findOne({
        where: {
            email
        }
    });

    if (!userFound) {
        await User.createUser(request.payload);

        return output({
            username: request.payload.username
        })

    }

    return error(400000, 'User not found', {})
}