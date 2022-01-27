import * as Joi from 'joi';
import { UniversityType } from '../utils/univ';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const email = Joi.string().email().required();
const password = Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required();
const username = Joi.string().alphanum().min(6).max(8);
const phone = Joi.string().pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).required();
const dateOfBirth = Joi.date().raw().required();
const sex = Joi.string().valid('male', 'female').required();

const userValidRegistr =
  Joi.object({
    username: username.required(),
    email,
    password,
    phone,
    dateOfBirth,
    sex
  })

const userValidAuth =
  Joi.object({
    email,
    password,
  })

const profileValid =
  Joi.object({
    faculty: Joi.string().required(),
    university: Joi.string().valid(...Object.values(UniversityType)).required(),
    group: Joi.string().optional()
  })

const userValidChange =
  Joi.object({
    username: username.optional(),
    password,
    phone,
    dateOfBirth,
    sex
  })


export {
  userValidRegistr,
  userValidAuth,
  profileValid,
  userValidChange
}


export interface profileType {
  userId: string,
  faculty: string,
  university: string,
  group: string,
  universId: string,
  type?: string
}