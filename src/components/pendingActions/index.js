import { ExternalMicroserviceError } from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import { externalMsBaseUrls } from '~/src/config';

const baseUrl = externalMsBaseUrls.pendingActions;

/**
 * Creates pending actions in bulk
 * @export
 * @param {Array} data
 * @returns
 */
export default async function createBulkPendingActions(data) {
  const endpoint = '/pending_items/bulk';
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
