import authErrorsEnum from '~/src/utils/enums/authEnums';

/**
 * Evaluates if the response from auth service had
 * an error indicating tha there is and error with the password
 * @param {Object} data - data object response from axios
 * @returns {Number} The allowed error code
 */
export default function errorReponseHasPasswordError({ data }) {
  if (data.errors) {
    const hasAuthError = data.errors.find(
      ({ errorCode }) => errorCode === authErrorsEnum.PasswordStrengthError,
    );
    return hasAuthError ? hasAuthError.errorCode : 0;
  }
  if (data.statusCode === 409) {
    return authErrorsEnum.UserAlreadyExist;
  }
  return 0;
}
