import {
  ExternalMicroserviceError,
  UnprocessableEntityError,
  NotFoundError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import userCompanyStatusEnum from '~/src/utils/enums/userCompanyEnum';
import { deleteCompany } from '~/src/components/companies';
import { externalMsBaseUrls } from '~/src/config';
import {
  errorReponseHasDuplicatedUserMobilePhone,
  errorResponseHasInvalidUserOrCompanyLink,
  errorResponseHasCreateUser,
  errorResponseHasInexistUser,
} from './utils';
import { userErrorsEnum, userStatusNum } from '~/src/utils/enums/userEnums';

const baseUrl = externalMsBaseUrls.users;
/**
 * Get a user by mobile phone and country calling code
 * @export
 * @param {object} data
 * @param {String} data.countryCallingCode
 * @param {String} data.mobilePhone
 * @throws {UnprocessableEntity Error} - when a user is already registered
 * @returns {Promise} - false when no user is found by mobile phone
 */
async function getUserByMobilePhone(
  { countryCallingCode, mobilePhone },
  getUserbyPhoneInfo = false,
) {
  const encodedCallingCountryCode = encodeURIComponent(countryCallingCode);
  const endpoint = `/users?countryCallingCode=${encodedCallingCountryCode}&mobilePhone=${mobilePhone}&getUserbyPhoneInfo=${getUserbyPhoneInfo}`;

  try {
    const response = await externalRequest.execute({ baseUrl, endpoint });
    return response;
  } catch ({ response }) {
    // return externalErrorMessage(error);
    const hasDuplicatedUser = errorReponseHasDuplicatedUserMobilePhone(
      response,
    );

    switch (hasDuplicatedUser) {
      case false:
        throw new ExternalMicroserviceError();
      default:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'mobilePhone',
          mobilePhone,
          'ExistentUser',
        );
    }
  }
}

/**
 * Gets the link between a company and a user
 * @param {Object} data
 * @param {String} data.userNumber
 * @param {String} data.companyNumber
 * @throws {UnprocessableEntityError} - when user doesn't exist
 * @throws {UnprocessableEntityError} - company not linked to user
 * @throws {ExternalMicroserviceError} - any ext error not expected
 * @returns {Promise<Object>}
 */
async function getUserCompanyLink({ userNumber, companyNumber }) {
  const endpoint = `/users/${userNumber}/company_link?companyNumber=${companyNumber}`;

  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
    });
    return response.data;
  } catch ({ response }) {
    const expectedUserCompanyLinkErrorCode = errorResponseHasInvalidUserOrCompanyLink(
      response,
    );

    switch (expectedUserCompanyLinkErrorCode) {
      case userErrorsEnum.UserNotExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'userNumber',
          userNumber,
          'InexistentUser',
        );
      case userErrorsEnum.CompanyNotLinkedToUser:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'companyNumber',
          companyNumber,
          'CompanyNotLinkedToUser',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}

/**
 * Search for an user with this email already exist on user´ service
 * @param {Object} user request object to execute the petition
 * @param {String} user.email request object to execute the petition
 * @returns {Promise<Object>} Returns the user service response if request ends succesfully
 */
async function getUserByEmail({ email }) {
  const encodedEmail = encodeURIComponent(email);
  const endpoint = `/users?email=${encodedEmail}`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
    });
    return response;
  } catch (error) {
    throw new ExternalMicroserviceError();
  }
}

/**
 * Update user-company link status to deleted on user's service
 * @param {String} userNumber
 * @param {String} companyNumber
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>} User service response if request ends succesfully
 */
async function deleteUserCompanyLink(userNumber, companyNumber) {
  const endpoint = `/users/${userNumber}/company_link`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'PATCH',
      body: {
        companyNumber,
        userCompanyLinkStatus: userCompanyStatusEnum.deleted,
      },
    });
    return response;
  } catch ({ response }) {
    throw new ExternalMicroserviceError();
  }
}

/**
 * Create company and branch link on user's service
 * @param {Object} company request object to execute the petition
 * @param {String} company.companyNumber
 * @param {Object} company.branch
 * @param {String} userNumber
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>} User service response if request ends succesfully
 */
async function insertUserCompanyLink({ companyNumber, branch }, userNumber) {
  try {
    const endpoint = `/users/${userNumber}/company_link`;
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'POST',
      body: {
        companyNumber,
        branchNumber: branch.branchNumber,
        defaultBranchNumber: branch.branchNumber,
        userCompanyLinkStatus: userCompanyStatusEnum.active,
      },
    });
    return response.data;
  } catch (error) {
    throw new ExternalMicroserviceError();
  }
}

/**
 * Update lead status on user's service
 * if any error occurs at this point delete the company
 * and user-company link
 * @param {String} userNumber
 * @param {String} companyNumber
 * @param {String} leadStatus
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>} User service response if request ends succesfully
 */
async function udpateLeadStatus(userNumber, companyNumber, leadStatus) {
  const endpoint = `/users/${userNumber}/lead_status`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'PATCH',
      body: {
        leadStatus,
      },
    });

    return response.data;
  } catch ({ response }) {
    await deleteCompany(companyNumber);
    await deleteUserCompanyLink(userNumber, companyNumber);
    throw new ExternalMicroserviceError();
  }
}

/**
 * Create a new user
 * @param {Object} user request object to execute the petition
 * @returns {Promise<Object>} Returns the user service response if request ends succesfully
 */
async function postUser(user) {
  const endpoint = '/users';
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      body: user,
      method: 'POST',
    });

    return response;
  } catch ({ response }) {
    const expectedCreateUserErrorCode = errorResponseHasCreateUser(response);

    switch (expectedCreateUserErrorCode) {
      case userErrorsEnum.EmailAlreadyExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'email',
          user.email,
          'EmailAlreadyRegistered',
        );
      case userErrorsEnum.ConfirmationCodeAlreadyExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'confimationCode',
          user.confimationCode,
          'ConfirmationCodeAlreadyRegistered',
        );
      case userErrorsEnum.MobilePhoneAlreadyExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'mobilePhone',
          user.mobilePhone,
          'ExistentUser',
        );
      case userErrorsEnum.CantRegisterPhoneWithoutCode:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'countryCallingCode',
          user.countryCallingCode,
          'CantRegisterPhoneWithoutCode',
        );
      case userErrorsEnum.InvalidRole:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'role',
          user.role,
          'InvalidRole',
        );
      case userErrorsEnum.InvalidLeadStatus:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'leadStatus',
          user.leadStatus,
          'InvalidLeadStatus',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}

/**
 * Update User as a secure one
 * @param {Object} user request object to execute the petition
 * @param {Number} user.userNumber
 * @returns {Promise<Object>} Returns the user service response if request ends succesfully
 */
async function updateUserAsSecure({ userNumber }) {
  const endpoint = `/users/${userNumber}/secure`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'POST',
    });

    return response.data;
  } catch ({ response }) {
    const expectedUpdateUserAsSecureErrorCode = errorResponseHasInexistUser(
      response,
    );

    switch (expectedUpdateUserAsSecureErrorCode) {
      case userErrorsEnum.UserNotExist:
        throw new UnprocessableEntityError(
          'Unprocessable entity error',
          'userNumber',
          userNumber,
          'InexistentUser',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}

/**
 * Create new user object
 * @export
 * @param {object} data
 * @returns {Object} Build user object
 */
function buildCreateUserObject(data) {
  return {
    email: data.email,
    firstName: data.name,
    lastName: data.lastName,
    countryCallingCode: data.countryCallingCode,
    mobilePhone: data.mobilePhone,
    confirmationCode: data.confirmationCode,
    leadStatus: 'pendingCompanyCreation',
  };
}

/**
 * Create new user on user service
 * @export
 * @param {object} data
 * @returns {Promise<Object>} With the saved user information
 */
async function createUser(data) {
  const userServiceInput = buildCreateUserObject(data);

  const newUser = await postUser(userServiceInput);
  return newUser.data;
}

/**
 * Delete User
 * @param {Object} user request object to execute the petition
 * @param {Number} user.userNumber
 * @returns {Promise<Object>} Returns the user service response if request ends succesfully
 */
async function eliminateUser({ userNumber }) {
  const endpoint = `/users/${userNumber}/delete`;
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'POST',
    });

    return response.data;
  } catch (error) {
    const { response } = error;
    const expectedUpdateUserAsSecureErrorCode = errorResponseHasInexistUser(
      response,
    );

    switch (expectedUpdateUserAsSecureErrorCode) {
      case userErrorsEnum.UserNotExist:
        throw new NotFoundError(
          'Not found error',
          'userNumber',
          userNumber,
          'InexistentUser',
        );
      default:
        throw new ExternalMicroserviceError();
    }
  }
}

/**
 * Validates if a user can log in :
 * - An user exist with the mobile phone given
 * - The user is active on users ms
 * @param {Object} data request object to execute the petition
 * @returns {Promise<Object>} Returns the user  information  to continue  with the process
 */
async function validateUserInfoForLogIn(data) {
  const getUserbyPhoneInfo = true;
  const response = await getUserByMobilePhone(data, getUserbyPhoneInfo);

  const user = response.data;

  if (user.UserStatusId === userStatusNum.active) {
    return user;
  }
  throw new UnprocessableEntityError(
    'Unprocessable entity error',
    'mobilePhone',
    `${data.countryCallingCode}${data.mobilePhone}`,
    'InvalidUserStatus',
  );
}

export {
  createUser,
  deleteUserCompanyLink,
  eliminateUser,
  getUserByMobilePhone,
  getUserByEmail,
  getUserCompanyLink,
  insertUserCompanyLink,
  postUser,
  udpateLeadStatus,
  updateUserAsSecure,
  validateUserInfoForLogIn,
};
