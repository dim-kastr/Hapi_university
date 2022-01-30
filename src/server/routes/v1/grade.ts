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
    {
        method: 'GET',
        path: '/v1/user/profile/{id}/grade/avg',
        handler: users.avgGradeByStudent,
        options: {
            auth: {
                strategy: 'jwt-access'
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/user/profile/{university}/{faculty}/grade/avg',
        handler: users.avgGradeByFaculty,
        options: {
            auth: {
                strategy: 'jwt-access'
            }
        }
    },
];