import { UnprocessableEntityError, NotFoundError } from 'gx-node-api-errors';
import {
  insertLeadSp,
  getLeadByConfirmationCodeSp,
  getLeadByMobilePhoneSp,
  getLeadByEmailSp,
  getRecentUncofirmedLeadsSp,
  confirmLeadSp,
  deleteOldUncofirmedLeadsSp,
} from '~/src/components/lead/datastores';
import { excuteSp } from '~/src/components/utils/db';

import generateRandomCode from '~/src/components/utils/random';
import { getUserByMobilePhone, getUserByEmail } from '~/src/components/users';

import { leads } from '~/src/config';

/**
 * Generates random 4 digit code that not exists already in Lead table
 * @param {Object} sqlManager db connection object
 *
 * @return {Promise} An integer with the code
 */
async function generateConfirmationCode(sqlManager) {
  const confirmationCode = await generateRandomCode();
  const lead = await excuteSp(sqlManager, getLeadByConfirmationCodeSp, {
    confirmationCode,
  });

  return !lead ? confirmationCode : generateConfirmationCode(sqlManager);
}

/**
 * Given contry countryCallingCode and a mobilePhone returns a lead or null if lead does not exist.
 *
 * @param {Object} sqlManager
 * @param {String} countryCallingCode e.g. +52
 * @param {String} mobilePhone
 *
 * @return {Promise}
 */
async function getLeadByMobilePhone(
  sqlManager,
  countryCallingCode,
  mobilePhone,
) {
  const lead = await excuteSp(sqlManager, getLeadByMobilePhoneSp, {
    countryCallingCode,
    mobilePhone,
  });

  return lead || null;
}

/**
 * Looks up for the existance of a mobile phone on lead table
 * if it does not exist on lead looks for a fully registered
 * user
 * @export
 * @param {object} sqlmanager
 * @param {object} data
 * @param {object} data.countryCallingCode
 * @param {object} data.mobilePhone
 * @returns {Promise} - false when no existance of lead and user
 */
async function validateMobilePhoneExistance(sqlmanager, data) {
  const existentSignUp = await excuteSp(
    sqlmanager,
    getLeadByMobilePhoneSp,
    data,
  );

  if (!existentSignUp) {
    const { data: response } = await getUserByMobilePhone(data);
    return response;
  }

  throw new UnprocessableEntityError(
    'Unprocessable entity error',
    'mobilePhone',
    data.mobilePhone,
    'ExistentUser',
  );
}

/**
 * Search for valid users with the given email
 * @export
 * @param {Object} sqlmanager
 * @param {object} data
 * @param {object} data.email
 * @returns {Promise} - true when does not exist this email on user
 */
async function validateEmailExistance(sqlmanager, data) {
  const existentEmailOnSignUp = await excuteSp(
    sqlmanager,
    getLeadByEmailSp,
    data,
  );

  if (!existentEmailOnSignUp) {
    const { data: response } = await getUserByEmail(data);
    if (!response || response.userStatus !== 'active') {
      return true;
    }
  }

  throw new UnprocessableEntityError(
    'Unprocessable Entity Error',
    'email',
    data.email,
    'EmailAlreadyRegistered',
  );
}

/**
 * Save signup register into database
 * @export
 * @param {Object} sqlmanager
 * @param {object} data
 * @returns {Promise<Object>} With the saved object
 */
async function insertLead(sqlmanager, data) {
  const leadInserted = await excuteSp(sqlmanager, insertLeadSp, data);
  return leadInserted;
}

/**
 * Confirm lead and release confirmation code function
 * @export
 * @param {Object} sqlmanager
 * @param {object} data
 * @returns {Promise<Object>} With the updated object
 */
async function confirmLead(sqlmanager, data) {
  const lead = await excuteSp(sqlmanager, getLeadByMobilePhoneSp, data);

  if (!lead.confirmed) {
    const leadConfirmed = await excuteSp(sqlmanager, confirmLeadSp, data);
    return leadConfirmed;
  }
  throw new UnprocessableEntityError(
    'Unprocessable entity error',
    'mobilePhone',
    `${data.countryCallingCode}${data.mobilePhone}`,
    'AccountAlreadyConfirmed',
  );
}

/**
 * Deletes leads that are uncofirmed
 * and more or equal than X days of age
 * determined by the env var
 * @param {*} sqlmanager
 * @returns {Promise<Array>}
 */
async function deleteOldUncofirmedLeads(sqlmanager) {
  const unconfirmedDays = leads.daysUnconfirmedLeadsDelete;
  const deletedLeads = await excuteSp(sqlmanager, deleteOldUncofirmedLeadsSp, {
    requiredDaysToDeleteLead: unconfirmedDays,
  });
  return deletedLeads || [];
}

/**
 * Get the leads that are exactly
 * X days of age after signup date
 * determined by the env var
 * @param {*} sqlmanager
 * @returns {Promise<Array>}
 */
async function getRecentUnconfirmedLeads(sqlmanager) {
  const unconfirmedDays = leads.daysRecentUnconfirmedLeadsGet;

  const recentUncofirmedLeads = await excuteSp(
    sqlmanager,
    getRecentUncofirmedLeadsSp,
    { unconfirmedDays },
  );
  return recentUncofirmedLeads || [];
}

/**
 * Validates if the lead can be confirmed:
 * - Lead exist and has not being confimated
 * - Confirmation code is correct
 * @param sqlmanager
 * @param {Object} data request object to execute the petitio
 * @returns {Promise<Object>} Returns the lead information tocontinue with the process
 */
async function validateLeadForConfirmation(sqlmanager, data) {
  const lead = await excuteSp(sqlmanager, getLeadByMobilePhoneSp, data);

  if (!lead) {
    throw new NotFoundError(
      'Not found error',
      'mobilePhone',
      `${data.countryCallingCode}${data.mobilePhone}`,
      'InexistentLead',
    );
  }
  if (lead.confirmed) {
    throw new UnprocessableEntityError(
      'Unprocessable entity error',
      'mobilePhone',
      `${data.countryCallingCode}${data.mobilePhone}`,
      'AccountAlreadyConfirmed',
    );
  }
  if (lead.confirmationCode !== String(data.confirmationCode)) {
    throw new UnprocessableEntityError(
      'Unprocessable entity error',
      'confirmationCode',
      data.confirmationCode,
      'InvalidConfirmationCode',
    );
  }
  return lead;
}

export {
  confirmLead,
  deleteOldUncofirmedLeads,
  insertLead,
  generateConfirmationCode,
  getLeadByMobilePhone,
  getRecentUnconfirmedLeads,
  validateEmailExistance,
  validateLeadForConfirmation,
  validateMobilePhoneExistance,
};
