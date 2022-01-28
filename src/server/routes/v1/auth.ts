import * as users from '../../api/v1/auth';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'POST',
        path: '/v1/authentication',
        handler: users.userAuthentication,
        options: {
            validate: {
                payload: valid.userValidAuth
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/v1/registration',
        handler: users.userRegistration,
        options: {
            validate: {
                payload: valid.userValidRegistr
            },
            auth: false
        }
    },
];