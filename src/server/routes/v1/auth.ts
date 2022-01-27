import * as auth from '../../api/v1/auth';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'POST',
        path: '/v1/authentication',
        handler: auth.userAuthentication,
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
        handler: auth.userRegistration,
        options: {
            validate: {
                payload: valid.userValidRegistr
            },
            auth: false
        }
    },
];