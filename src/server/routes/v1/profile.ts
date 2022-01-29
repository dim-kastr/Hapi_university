import * as profile from '../../api/v1/profile';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'POST',
        path: '/v1/user/profile/create',
        handler: profile.createProfile,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.profileValid
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/user/profile/change/{id}',
        handler: profile.profileChange,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.profileValidChange
            }
        }
    },
];