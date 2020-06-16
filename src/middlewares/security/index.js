import { BadRequestError, AuthorizationError } from 'gx-node-api-errors';
import { introspectToken } from '~/src/components/auth';

/**
 * Process authorization headers
 * @param {String} authorizationHeader - Bearer token
 * @throws {BadRequestError} - when the authorization header is not provided
 * @throws {AuthorizationError} - when the authorization header is not in the requested format
 * @returns {String} token
 */
function processAuthorizationHeader(authorizationHeader) {
  if (!authorizationHeader) {
    throw new BadRequestError(
      'Bad Request Error',
      'authorization',
      null,
      'AuthorizationIsMissing',
    );
  }
  const tokenType = authorizationHeader.split(' ')[0];
  const token = authorizationHeader.split(' ')[1];
  if (tokenType !== 'Bearer' || token === '') {
    throw new AuthorizationError();
  }
  return token;
}

/**
 * Get user credentials from authorization token
 * @param {String} authorizationHeader - Bearer token
 * @returns {Promise<Object>} user
 */
export default async function getUserCredentials(authorizationHeader) {
  const token = processAuthorizationHeader(authorizationHeader);
  const user = await introspectToken(token);
  return {
    ...user,
    token,
    userNumber: user.user_metadata.userNumber,
  };
}
