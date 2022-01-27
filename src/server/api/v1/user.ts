import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { generateJwt } from '../../utils/auth';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'
import { University } from '../../models/University';
import { Profile } from '../../models/Profile';



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

    return error(Errors.InvalidPayload, 'User already exists', {})
}

export const createProlile = async (request: Request) => {

    const { name, faculty, group } = request.payload;

    const universityFound = await University.findOne({
        where: {
            name
        }
    })

    if (!universityFound) {
        return error(Errors.NotFound, 'University not found', {})
    }

    const profileFound = await Profile.findOne({
        where: {
            userId: request.auth.credentional.id,
            uneversityId: universityFound.id
        }
    })

    if (!profileFound) {
        await Profile.createProfile({
            userId: request.auth.credentials.id,
            faculty: faculty,
            university: name,
            group: group,
            universId: universityFound.id
        });

        return output()
    }

    return error(Errors.InvalidPayload, 'The data is entered incorrectly', {})
}