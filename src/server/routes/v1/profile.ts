import * as users from '../../api/v1/profile';
import * as valid from '../../schemes/index';


export default [
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