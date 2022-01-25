import * as Joi from 'joi';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

export function outputPaginationSchema(title: string, item: Joi.Schema): Joi.Schema {
  return Joi.object({
    ok: Joi.boolean().example(true),
    result: Joi.object({
      count: Joi.number().integer().example(10),
      [title]: Joi.array().items(item),
    }),
  });
}

const userValid =
  Joi.object({
    username: Joi.string().alphanum().min(6).max(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone: Joi.string().min(12).max(12).required(),
    dateOfBirth: Joi.date(),
    sex: Joi.string().min(4).max(6).required(),
  })

export { userValid };

export interface userType {
  username: string,
  email: string,
  password: string,
  phone: string,
  dateOfBirth: Date,
  sex: string
};

export interface profileType {
  userId: string,
  faculty: string,
  university: string,
  group: string,
  type: string
}