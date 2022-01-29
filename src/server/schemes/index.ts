import * as Joi from 'joi';
import { UniversityType } from '../utils/university';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const username = Joi.string().alphanum().min(6).max(8);
const email = Joi.string().email();
const password = Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/);
const phone = Joi.string().pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
const dateOfBirth = Joi.date().raw();
const sex = Joi.string().valid('male', 'female');
const faculty = Joi.string();
const university = Joi.string().valid(...Object.values(UniversityType));
const group = Joi.string();

const userValidRegistr =
  Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    phone: phone.required(),
    dateOfBirth: dateOfBirth.required(),
    sex: sex.required()
  })

const userValidAuth =
  Joi.object({
    email: email.required(),
    password: password.required()
  })

const profileValid =
  Joi.object({
    faculty: faculty.required(),
    university: university.required(),
    group: group.optional()
  })

const userValidChange =
  Joi.object({
    username: username.optional(),
    password: password.optional(),
    phone: phone.optional(),
    dateOfBirth: dateOfBirth.optional(),
    sex: sex.optional()
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