import { ExternalMicroserviceError } from 'gx-node-api-errors';
import { externalMsBaseUrls } from '~/src/config';
import * as externalRequest from '~/src/components/utils/externalRequest';

const baseUrl = externalMsBaseUrls.clients;

/**
 * Creates a client on clients
 * microservice
 * @export
 * @param {Object} data
 * @param {String} data.taxId
 * @param {String} data.commercialName
 * @param {Number} data.companyNumber
 * @returns {Promise}
 */
export default async function createClient(data) {
  const endpoint = '/clients';
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'POST',
      body: data,
    });
    return response.data;
  } catch ({ response }) {
    throw new ExternalMicroserviceError();
  }
}
