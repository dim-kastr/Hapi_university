import * as users from '../../api/v1/user';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'POST',
        path: '/v1/user/authentication',
        handler: users.userAuthentication,
        options: {
            validate: {
                payload: valid.userValid
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/v1/user/registration',
        handler: users.userRegistration,
        options: {
            validate: {
                payload: valid.userValid
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/v1/user/profile/create',
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