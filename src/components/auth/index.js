import {
  BadRequestError,
  AuthorizationError,
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import authErrorsEnum from '~/src/utils/enums/authEnums';
import errorReponseHasPasswordError from '~/src/components/auth/utils';

import * as externalRequest from '~/src/components/utils/externalRequest';
import { eliminateUser } from '~/src/components/users';
import { externalMsBaseUrls, authConfig } from '~/src/config';

const baseUrl = externalMsBaseUrls.auth;

/**
 * @param {String} token
 * @throws {AuthorizationError} - when the token is invalid
 * @throws {ExternalMicroserviceError} - any other error from the service
 * @returns {Promise<Object>} Auth service response if request ends succesfully
 */
async function introspectToken(token) {
  const endpoint = '/introspect';
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      body: {
        id_token: token,
      },
      method: 'POST',
    });
    return response.data;
  } catch ({ response }) {
    if (response.data.statusCode === 401) {
      throw new AuthorizationError();
    }
    throw new ExternalMicroserviceError();
  }
}

/**
 * @param {Object} data
 * @returns {Object} object to create an account on auth ms
 */
function buildCreateAccountObject(data) {
  const authCreate = {
    user_id: data.userId,
    email: data.email,
    email_verified: true,
    name: data.userCompleteName,
    password: data.password,
    user_metadata: {
      userNumber: data.userNumber,
      countryCode: 'MXN',
    },
  };
  return authCreate;
}

/**
 * @param {Object}
 * @throws {ExternalMicroserviceError} - any other error from the service
 * @returns {Promise<Object>} Auth service response if request ends succesfully
 */
async function createAccount(data) {
  const endpoint = '/users';
  const createAccountHeaders = {
    appid: authConfig.appId,
    appsecret: authConfig.appSecret,
  };
  const body = buildCreateAccountObject(data);
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      body,
      method: 'POST',
      headers: createAccountHeaders,
    });

    return response.data;
  } catch ({ response }) {
    await eliminateUser(data);
    const expectedAccountCreateErrorCode = errorReponseHasPasswordError(
      response,
    );

    switch (expectedAccountCreateErrorCode) {
      case authErrorsEnum.PasswordStrengthError:
        throw new BadRequestError(
          'Bad Request Error',
          'password',
          data.password,
          'PasswordStrengthError',
        );
      case authErrorsEnum.UserAlreadyExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'email',
          data.email,
          'EmailAlreadyRegistered',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}
export { createAccount, introspectToken };
