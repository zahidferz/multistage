import { DbError } from 'gx-node-api-errors';

/**
 * Search a lead with thw given confirmation code
 * @param {Object} connection mssql connection
 * @param {Object} object.confirmationCode number to search
 */
async function getLeadByConfirmationCodeSp(connection, { confirmationCode }) {
  try {
    const result = await connection
      .request()
      .input('confirmationCode', confirmationCode)
      .execute('GetLeadByConfirmationCode');

    return result.recordset[0];
  } catch (error) {
    throw new DbError(error);
  }
}

async function getLeadByMobilePhoneSp(
  connection,
  { countryCallingCode, mobilePhone },
) {
  try {
    const result = await connection
      .request()
      .input('countryCallingCode', countryCallingCode)
      .input('mobilePhone', mobilePhone)
      .execute('GetLeadByMobilePhone');
    return result.recordset[0];
  } catch (error) {
    throw new DbError(error);
  }
}

/**
 * Search for existed email on table lead
 * @param {Object} connection mssql connection
 * @param {Object} data data to search
 * @returns {Promise<Object>} Pre register data if find something
 */
async function getLeadByEmailSp(connection, { email }) {
  try {
    const result = await connection
      .request()
      .input('email', email)
      .execute('GetLeadByEmail');
    return result.recordset[0];
  } catch (error) {
    throw new DbError(error);
  }
}

/**
 * Insert new register on lead table
 * @param {Object} connection mssql connection
 * @param {Object} data data to save
 * @returns {Promise<Object>} Info saved or error if something happend with the db
 */
async function insertLeadSp(connection, data) {
  try {
    const result = await connection
      .request()
      .input('mobilePhone', data.mobilePhone)
      .input('countryCallingCode', data.countryCallingCode)
      .input('name', data.name)
      .input('lastName', data.lastName)
      .input('email', data.email)
      .input('confirmationCode', data.confirmationCode)
      .input('encodedPassword', data.encodedPassword)
      .input('confirmed', data.confirmed ? data.confirmed : 0)
      .input('subscriptionInfo', data.subscriptionInfo)
      .execute('InsertLeadRegister');
    return result.recordset[0];
  } catch (error) {
    throw new DbError(error.message);
  }
}

/**
 * Confirm lead and release confirmation code SP
 * @param {Object} connection mssql connection
 * @param {Object} data data to update lead
 * @returns {Promise<Object>} Info saved or error if something happend with the db
 */
async function confirmLeadSp(connection, data) {
  try {
    const result = await connection
      .request()
      .input('mobilePhone', data.mobilePhone)
      .input('countryCallingCode', data.countryCallingCode)
      .execute('ConfirmLead');

    return result.recordset[0];
  } catch (error) {
    throw new DbError(error.message);
  }
}

/**
 * Delete uncofirmed leads that are X days or older
 * @param {Object} connection mssql connection
 * @returns {Promise<Object>} Deleted leads
 */
async function deleteOldUncofirmedLeadsSp(connection, data) {
  try {
    const result = await connection
      .request()
      .input('requiredDaysToDeleteLead', data.requiredDaysToDeleteLead)
      .execute('DeleteOldUnconfirmedLeads');
    return result.recordset;
  } catch (error) {
    throw new DbError(error.message);
  }
}

/**
 * Delete a lead by mobile phone
 * @param {Object} connection mssql connection
 * @returns {Promise<Object>} Deleted lead
 */
async function deleteLeadByMobilePhoneSp(connection, data) {
  try {
    const result = await connection
      .request()
      .input('countryCallingCode', data.countryCallingCode)
      .input('mobilePhone', data.mobilePhone)
      .execute('DeleteLeadByMobilePhone');
    return result.recordset;
  } catch (error) {
    throw new DbError(error.message);
  }
}

/**
 * Get leads that are exactly X
 * days of age
 * @param {Object} connection mssql connection
 * @returns {Promise<Object>} Recent unconfirmed leads
 */
async function getRecentUncofirmedLeadsSp(connection, data) {
  try {
    const result = await connection
      .request()
      .input('unconfirmedDays', data.unconfirmedDays)
      .execute('GetRecentUnconfirmedLeads');
    return result.recordset;
  } catch (error) {
    throw new DbError(error.message);
  }
}

export {
  confirmLeadSp,
  deleteLeadByMobilePhoneSp,
  deleteOldUncofirmedLeadsSp,
  getLeadByConfirmationCodeSp,
  getLeadByMobilePhoneSp,
  getLeadByEmailSp,
  getRecentUncofirmedLeadsSp,
  insertLeadSp,
};
