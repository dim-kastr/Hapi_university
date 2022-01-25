import * as Joi from 'joi';
import * as users from '../../api/v1/user';
import * as valid from '../../schemes/index';


/**
 * 
 * All user routes of version 1
 * 
 */
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
];