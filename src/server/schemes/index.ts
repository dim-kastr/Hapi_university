import * as Joi from 'joi';


export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const userValid =
  Joi.object({
    username: Joi.string().alphanum().min(6).max(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    phone: Joi.string().pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).required(),
    dateOfBirth: Joi.date().raw(),
    sex: Joi.string().valid('male', 'female').required(),
  })

export { userValid };

