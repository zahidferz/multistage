import * as externalRequest from '~/src/components/utils/externalRequest';
import { externalMsBaseUrls } from '~/src/config';

const baseUrl = externalMsBaseUrls.errorsTranslator;

/** Get the spanish translation of an error message
 * @param {Object} data
 * @param {String} data.microservice
 * @param {Array} data.errors
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>}
 */
export default async function getErrorTranslate({ microservice, errors }) {
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint: '/errors_translator/',
      body: {
        microservice,
        errors,
        language: 'es_mx',
      },
      method: 'POST',
    });
    return response.data;
  } catch (error) {
    return {
      microservice,
      error,
    };
  }
}
