import { userErrorsEnum } from '~/src/utils/enums/userEnums';

/**
 * Evaluates if the response from users have
 * an error code 18 that indicates duplicated user
 * mobile phone
 * @param {Object} data - data object response from axios
 * @returns {Boolean}
 */
function errorReponseHasDuplicatedUserMobilePhone({ data }) {
  if (data.errors) {
    const hasDuplicatedUserError = data.errors.find(
      ({ errorCode }) => errorCode === userErrorsEnum.MobilePhoneAlreadyExist,
    );
    return !!hasDuplicatedUserError;
  }
  return false;
}

function errorResponseHasInvalidUserOrCompanyLink({ data }) {
  if (data.errors) {
    const hasExpectedError = data.errors.find(
      ({ errorCode }) => errorCode === userErrorsEnum.UserNotExist
        || errorCode === userErrorsEnum.CompanyNotLinkedToUser,
    );
    return hasExpectedError ? hasExpectedError.errorCode : false;
  }
  return false;
}

function errorResponseHasCreateUser({ data }) {
  if (data.errors) {
    const hasExpectedError = data.errors.find(
      ({ errorCode }) => errorCode === userErrorsEnum.EmailAlreadyExist
        || errorCode === userErrorsEnum.ConfirmationCodeAlreadyExist
        || errorCode === userErrorsEnum.MobilePhoneAlreadyExist
        || errorCode === userErrorsEnum.CantRegisterPhoneWithoutCode
        || errorCode === userErrorsEnum.InvalidRole
        || errorCode === userErrorsEnum.InvalidLeadStatus,
    );
    return hasExpectedError ? hasExpectedError.errorCode : false;
  }
  return false;
}

function errorResponseHasInexistUser({ data }) {
  if (data.errors) {
    const hasExpectedError = data.errors.find(
      ({ errorCode }) => errorCode === userErrorsEnum.UserNotExist,
    );
    return hasExpectedError ? hasExpectedError.errorCode : false;
  }
  return false;
}

export {
  errorReponseHasDuplicatedUserMobilePhone,
  errorResponseHasCreateUser,
  errorResponseHasInexistUser,
  errorResponseHasInvalidUserOrCompanyLink,
};
