import Joi from '@hapi/joi';

import { mobilePhoneRegex, countryCallingCodeRegex } from '~/src/utils/regex';

function sendConfirmationCodeSchema() {
  return Joi.object().keys({
    mobilePhone: Joi.string()
      .min(10)
      .max(12)
      .required(),
    countryCallingCode: Joi.string()
      .regex(countryCallingCodeRegex)
      .required()
      .min(2)
      .max(4)
      .required(),
  });
}

function validateMobilePhoneSchema() {
  return Joi.object().keys({
    countryCallingCode: Joi.string()
      .regex(countryCallingCodeRegex)
      .required()
      .min(2)
      .max(4),
    mobilePhone: Joi.string()
      .regex(mobilePhoneRegex)
      .required()
      .min(10)
      .max(12),
  });
}

const signUpSchema = Joi.object().keys({
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
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  subscriptionInfo: Joi.string().allow(null, ''),
});

function insertSignupSchemaEnpoint() {
  return Joi.object()
    .keys({
      body: signUpSchema.required(),
      params: Joi.object()
        .optional()
        .unknown(true),
      query: Joi.object()
        .keys({
          sendConfirmationCode: Joi.boolean()
            .allow(1, 0)
            .default(true),
          sendSlackNotification: Joi.boolean()
            .allow(1, 0)
            .default(true),
        })
        .optional()
        .unknown(true),
    })
    .unknown(true);
}

const confirmationSchema = Joi.object().keys({
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
  confirmationCode: Joi.string()
    .min(4)
    .max(4)
    .required(),
  agreedTermsAndConditions: Joi.boolean()
    .allow(1, 0)
    .required(),
});

function confirmAccountSchemaEnpoint() {
  return Joi.object()
    .keys({
      body: confirmationSchema.required(),
      params: Joi.object()
        .optional()
        .unknown(true),
      query: Joi.object()
        .keys({
          sendWhatsAppNotification: Joi.boolean()
            .allow(1, 0)
            .default(true),
          sendSlackNotification: Joi.boolean()
            .allow(1, 0)
            .default(true),
        })
        .optional()
        .unknown(true),
    })
    .unknown(true);
}

export {
  confirmAccountSchemaEnpoint,
  confirmationSchema,
  insertSignupSchemaEnpoint,
  signUpSchema,
  sendConfirmationCodeSchema,
  validateMobilePhoneSchema,
};
