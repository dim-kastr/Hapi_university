import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import * as boom from '@hapi/boom';
import { generateJwt } from '../../utils/auth';


/**
 * Verifying user authentication
 * 
 * @remarks
 * log in to your account
 * 
 * @param {string} request - username and password
 * 
 * @returns - access and refresh jwt tokens
 */
export const userAuthentication = async (request: Request) => {

  const {
    email,
    password
  } = request.payload as any;

  const user = await User.scope('withPassword').findOne({
    where: {
      email
    }
  });

  if (!user) {
    throw boom.notFound('User not found');
  } // user search

  if (!user.passwordCompare(password)) {
    throw boom.badRequest('Password was entered incorrectly');
  } // password verification

  const sessionNew = await Session.newSession(user.id);
  //creating a session 
  const token = generateJwt(sessionNew);

  return {
    access: token.access
  }
}

/**
 * User registration in the system 
 * 
 * @remarks
 * Vetifycation of the user's existence in the system 
 * Registering a new account 
 * 
 * @param {string} request - username and password
 * 
 * @returns {string} -  user greeting or login error
 */
export const userRegistration = async (request: Request) => {

  const {
    email,
  } = request.payload as any;

  const userFound = await User.findOne({
    where: {
      email
    }
  });

  if (!userFound) {
    await User.createUser(request.payload);

    return (`Hello my friend ${request.payload.username}`);
  }

  return boom.badRequest('User already exists')
}