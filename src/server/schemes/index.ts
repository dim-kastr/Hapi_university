import * as Joi from 'joi';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const email = Joi.string().email().required();
const password = Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required();


const userValidRegistr =
  Joi.object({
    username: Joi.string().alphanum().min(6).max(8).required(),
    email,
    password,
    phone: Joi.string().pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).required(),
    dateOfBirth: Joi.date().raw().required(),
    sex: Joi.string().valid('male', 'female').required(),
  })

const userValidAuth =
  Joi.object({
    email,
    password
  })

export { userValidRegistr, userValidAuth };