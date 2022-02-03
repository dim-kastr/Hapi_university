import * as users from '../../api/v1/user';
import * as valid from '../../schemes/index';


export default [
    {
        method: 'PUT',
        path: '/v1/user/change',
        handler: users.changeUser,
        options: {
            auth: {
                strategy: 'jwt-access'
            },
            validate: {
                payload: valid.userValidChange
            }
        }
    },
];