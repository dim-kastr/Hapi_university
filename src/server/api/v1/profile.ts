import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'
import { University } from '../../models/University';
import { Profile } from '../../models/Profile';
import { group } from 'console';


export const createProfile = async (request: Request) => {
    const { university, faculty, group } = request.payload;

    const user: User = request.auth.credentials;

    const universityFound = await University.findOne({
        where: {
            name: university
        }
    })

    if (!universityFound) {
        return error(Errors.NotFound, 'University not found', {})
    }


    const profileFound = await Profile.findOne({
        where: {
            userId: user.id,
            universId: universityFound.id
        }
    })

    if (!profileFound) {
        const createProf = await Profile.createProfile({
            userId: user.id,
            faculty: faculty,
            university,
            group,
            type: group ? 'Student' : 'Teacher',
            universId: universityFound.id
        });

        return output(createProf)
    }

    return error(Errors.InvalidPayload, 'The data is entered incorrectly', {})

}

export const profileChange = async (request: Request) => {

    const user = request.auth.credentials;

    const { faculty, university, group } = request.payload;

    const



}