import Joi from '@hapi/joi';

import { mobilePhoneRegex, countryCallingCodeRegex } from '~/src/utils/regex';

const logInSchema = Joi.object().keys({
  mobilePhone: Joi.string()
    .regex(mobilePhoneRegex)
    .min(10)
    .max(12)
    .required(),
  countryCallingCode: Joi.string()
    .regex(countryCallingCodeRegex)
    .min(2)
    .max(4)
    .required(),
  password: Joi.string()
    .required()
    .min(8),
});

export default function logInSchemaEnpoint() {
  return Joi.object()
    .keys({
      body: logInSchema.required(),
      params: Joi.object()
        .optional()
        .unknown(true),
      query: Joi.object()
        .optional()
        .unknown(true),
    })
    .unknown(true);
}
