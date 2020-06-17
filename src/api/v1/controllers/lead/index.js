import { NotFoundError } from 'gx-node-api-errors';
import convertFalsyOrTruthyToBoolean from '~/src/components/utils/parsers';
import returnErrorDependingOnStatusCodeExistence from '~/src/utils/routesFunctionHelper';
import validateSchemaForRoutes from '~/src/components/utils/schema';

import {
  confirmAccountSchemaEnpoint,
  insertSignupSchemaEnpoint,
  sendConfirmationCodeSchema,
  validateMobilePhoneSchema,
} from '~/src/api/v1/controllers/lead/schemas';
import {
  deleteLead,
  generateConfirmationCode,
  getLeadByMobilePhone,
  insertLead,
  validateEmailExistance,
  validateLeadForConfirmation,
  validateMobilePhoneExistance,
} from '~/src/components/lead';
import { createAccount } from '~/src/components/auth';
import { createUser, updateUserAsSecure } from '~/src/components/users';
import {
  notifyUserRegistered,
  notifyUserConfirmedAccount,
} from '~/src/components/slack';
import {
  sendConfirmationCode,
  sendNewUserWelcomeMessage,
} from '~/src/components/twilio';

async function sendConfirmationCodeController(req, res, next) {
  try {
    const data = req.body;
    const schema = sendConfirmationCodeSchema();
    await validateSchemaForRoutes(data, schema);
    const sqlManager = req.app.locals.SqlManager;
    const lead = await getLeadByMobilePhone(
      sqlManager,
      data.countryCallingCode,
      data.mobilePhone,
    );

    if (!lead) {
      throw new NotFoundError(
        'Mobile phone not found',
        'mobilePhone',
        `${data.countryCallingCode}${data.mobilePhone}`,
        'NonExistantLead',
      );
    }
    await sendConfirmationCode(
      `${lead.countryCallingCode}${lead.mobilePhone}`,
      lead.confirmationCode,
    );

    return res.status(204).send();
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

async function validateLeadMobilePhoneExistanceController(req, res, next) {
  try {
    const countryCallingCode = req.header('Country-Calling-Code');
    const mobilePhone = req.header('Mobile-Phone');

    const data = {
      countryCallingCode,
      mobilePhone,
    };
    await validateSchemaForRoutes(data, validateMobilePhoneSchema());
    const sqlmanager = req.app.locals.SqlManager;
    const response = await validateMobilePhoneExistance(sqlmanager, data);
    return res.send(response);
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

/**
 * Build the new lead object. Can be used to create a new register for sign up
 * @param {Object} sqlmanager
 * @param {Object} req
 * @param {Object} req.body
 * @param {Object} req.query
 * @returns {Promise<Object>} Returns the new objet to create a lead
 */
async function buildLeadObject(sqlmanager, { body, query }) {
  const confirmationCode = await generateConfirmationCode(sqlmanager);
  return {
    ...body,
    confirmationCode,
    encodedPassword: body.password,
    sendConfirmationCode: convertFalsyOrTruthyToBoolean(
      query.sendConfirmationCode,
    ),
    sendSlackNotification: convertFalsyOrTruthyToBoolean(
      query.sendSlackNotification,
    ),
  };
}

/**
 * Insert a new signup request
 * @param {Object} req request object to execute the petition
 * @param {Object} res response object to manage the petition
 * @param {Object} next next object to manage the petition
 * @returns {Promise<Object>} Returns the new user register is ends successfully,
 *  or error if is an invalid request
 */
async function createLeadController(req, res, next) {
  try {
    await validateSchemaForRoutes(req, insertSignupSchemaEnpoint());
    const sqlmanager = req.app.locals.SqlManager;
    const dataToCreateLead = await buildLeadObject(sqlmanager, req);
    await validateMobilePhoneExistance(sqlmanager, dataToCreateLead);
    await validateEmailExistance(sqlmanager, dataToCreateLead);
    const newSignUpRegister = await insertLead(sqlmanager, dataToCreateLead);

    if (dataToCreateLead.sendConfirmationCode) {
      await sendConfirmationCode(
        newSignUpRegister,
        newSignUpRegister.confirmationCode,
      );
    }
    if (dataToCreateLead.sendSlackNotification) {
      await notifyUserRegistered(dataToCreateLead);
    }

    return res.status(201).send();
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

/**
 * get the confirmation code by countryCallingCode + mobilePhone
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Promise<Object>} Returns the confirmationCode
 */
async function getConfirmationCodeController(req, res, next) {
  try {
    const data = {
      countryCallingCode: req.header('Country-Calling-Code'),
      mobilePhone: req.header('Mobile-Phone'),
    };
    await validateSchemaForRoutes(data, validateMobilePhoneSchema());
    const sqlManager = req.app.locals.SqlManager;
    const lead = await getLeadByMobilePhone(
      sqlManager,
      data.countryCallingCode,
      data.mobilePhone,
    );
    if (!lead || lead.confirmed) {
      throw new NotFoundError('Not found Error', null, null, 'NonExistantLead');
    }
    return res.send({
      confirmationCode: lead.confirmationCode,
    });
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

/**
 * Confirm an account
 * @param {Object} req request object to execute the petition
 * @param {Object} res response object to manage the petition
 * @param {Object} next next object to manage the petition
 * @returns {Promise<Object>} Returns the new user register is ends successfully,
 *  or error if is an invalid request
 */
async function confirmLeadController(req, res, next) {
  try {
    await validateSchemaForRoutes(req, confirmAccountSchemaEnpoint());
    const sqlmanager = req.app.locals.SqlManager;
    const leadInput = {
      ...req.body,
    };
    leadInput.confirmationCode = parseInt(leadInput.confirmationCode, 10);
    const leadInformation = await validateLeadForConfirmation(
      sqlmanager,
      leadInput,
    );

    const user = await createUser(leadInformation);

    await createAccount({
      ...user,
      password: leadInformation.password,
    });
    await deleteLead(sqlmanager, leadInformation);

    const userAsSecure = await updateUserAsSecure(user);

    const sendWhatsAppNotification = convertFalsyOrTruthyToBoolean(
      req.query.sendWhatsAppNotification,
    );
    const sendSlackNotification = convertFalsyOrTruthyToBoolean(
      req.query.sendSlackNotification,
    );

    if (sendWhatsAppNotification) {
      await sendNewUserWelcomeMessage(leadInformation);
    }

    if (sendSlackNotification) {
      await notifyUserConfirmedAccount(leadInformation);
    }

    return res.status(201).send({ userNumber: userAsSecure.userNumber });
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

export {
  confirmLeadController,
  createLeadController,
  getConfirmationCodeController,
  sendConfirmationCodeController,
  validateLeadMobilePhoneExistanceController,
};
