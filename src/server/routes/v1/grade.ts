import * as users from '../../api/v1/grade';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'POST',
        path: '/v1/user/profile/{id}/grade/create',
        handler: users.createGrade,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.gradesValid
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/user/profile/grade/{id}/change',
        handler: users.changeGrade,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.gradesValidChange
            }
        }
    },
];