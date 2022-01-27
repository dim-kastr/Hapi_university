import * as users from '../../api/v1/user';
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
    {
        method: 'POST',
        path: '/v1/profile/create',
        handler: users.createProlile,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.profileValid
            }
        }
    }
];