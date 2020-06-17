import {
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import {
  errorResponseHasInexistentCompany,
  errorResponseInsertCompanyHasExpectedError,
} from './utils';
import errorEnum from '~/src/utils/enums/companiesEnums';
import { externalMsBaseUrls } from '~/src/config';

const baseUrl = externalMsBaseUrls.companies;
const countryCodeDefault = 'MEX';

/**
 * Gets a company by company number
 *
 * @export
 * @param {Object} company
 * @param {String} company.companyNumber
 * @throws {UnprocessableEntityError} - if the company doesnt exist
 * @throws {ExternalMicroserviceError} - if any unexepected error from
 * microservice
 * @returns
 */
async function getCompanyByNumber({ companyNumber }) {
  const endpoint = `/companies/${companyNumber}`;
  try {
    const response = await externalRequest.execute({ baseUrl, endpoint });
    return response.data;
  } catch ({ response }) {
    const expectedCompanyerrorCode = errorResponseHasInexistentCompany(
      response,
    );

    if (expectedCompanyerrorCode) {
      throw new UnprocessableEntityError(
        'Unprocessable entity error',
        'companyNumber',
        companyNumber,
        'InexistentCompany',
      );
    }
    throw new ExternalMicroserviceError();
  }
}

/**
 * Insert a new company on companies service
 * @param {Object} company
 * @throws {UnprocessableEntityError} - when there is already a company with the same taxId
 * @throws {ExternalMicroserviceError} - any other error from the service
 * @returns {Promise<Object>} Companies service response if request ends succesfully
 */
async function insertCompany(company) {
  const endpoint = '/companies';
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      body: { ...company, countryCode: countryCodeDefault },
      method: 'POST',
    });
    return response.data;
  } catch ({ response }) {
    const errorCode = errorResponseInsertCompanyHasExpectedError(response);
    switch (errorCode) {
      case errorEnum.AlreadyExistentTaxId:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'taxId',
          company.taxId,
          'TaxIdAlreadyExist',
        );
      case errorEnum.InvalidPattern:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'taxId',
          company.taxId,
          'InvalidTaxIdPattern',
        );
      case errorEnum.InvalidLength:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'taxId',
          company.taxId,
          'InvalidLength',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}

/**
 * Delete a company on companies service
 * @param {String} companyNumber
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>} Companies service response if request ends succesfully
 */
async function deleteCompany(companyNumber) {
  const endpoint = `/companies/${companyNumber}`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'DELETE',
    });
    return response.data;
  } catch ({ response }) {
    throw new ExternalMicroserviceError();
  }
}

/**
 * Update a company subscription number
 * by the given company number
 * @param {Number} companyNumber
 * @param {String} subscriptionNumber
 * @throws {UnprocessableEntityError} - when inexistent company
 * @throws {ExternalMicroserviceError} - when the microservice throws
 * any unexpected error
 * @returns
 */
async function updateSubscriptionNumber(companyNumber, subscriptionNumber) {
  const endpoint = `/companies/${companyNumber}`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'PATCH',
      body: { subscriptionNumber },
    });
    return response.data;
  } catch ({ response }) {
    const expectedCompanyerrorCode = errorResponseHasInexistentCompany(
      response,
    );

    if (expectedCompanyerrorCode) {
      throw new UnprocessableEntityError(
        'Unprocessable entity error',
        'companyNumber',
        companyNumber,
        'InexistentCompany',
      );
    }
    throw new ExternalMicroserviceError();
  }
}

export {
  deleteCompany,
  getCompanyByNumber,
  insertCompany,
  updateSubscriptionNumber,
};
