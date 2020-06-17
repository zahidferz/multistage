import axios from 'axios';

/*
  Error codes that are standarized across
  microservices
*/
const msErrorCodes = {
  InvalidPattern: 3,
  InvalidLength: 5,
};

/**
 * Builds a request and gets the response from and endpoint
 * GET request method by default.
 * Request method, headers and body are optional
 * @param {Object} requestParameters - specific endpoint for the request
 * @param {String} requestParameters.baseUrl - specific endpoint for the request
 * @param {String} requestParameters.endpoint - specific endpoint for the request
 * @param {String} [requestParameters.method='GET'] - GET, POST, PATCH, DELETE...
 * @param {Object} [requestParameters.headers={}] - Request headers { 'Auth': 'Bearer x12m29'}
 * @param {Object} [requestParameters.body=null] - Body of the request
 * @returns
 */
/*
  Needed to disable default export in
  order to use spyOn on integration
  tests
*/
// eslint-disable-next-line
async function execute(requestParameters) {
  const {
    baseUrl,
    endpoint,
    body = null,
    method = 'GET',
    headers = {},
  } = requestParameters;
  const options = {
    method,
    headers: { 'content-type': 'application/json', ...headers },
    url: `${baseUrl}${endpoint}`,
    data: body,
  };
  const response = await axios(options);
  return response;
}
// eslint-disable-next-line
export { execute, msErrorCodes };
