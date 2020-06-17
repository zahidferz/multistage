/**
 * Evaluates if the response from companies have
 * an error code 10 that indicates the company
 * does not exist
 * @param {Object} data - data object response from axios
 * @returns {Boolean}
 */
function errorResponseHasInexistentCompany({ data }) {
  if (data.errors) {
    const hasUnexistentCompanyError = data.errors.find(
      ({ errorCode }) => errorCode === 10,
    );
    return !!hasUnexistentCompanyError;
  }
  return false;
}

function errorResponseInsertCompanyHasExpectedError({ data }) {
  if (data.errors) {
    const hasExpectedCompanyError = data.errors.find(
      // prettier-ignore
      ({ errorCode }) => errorCode === 11 || errorCode === 3 || errorCode === 5,
    );
    return hasExpectedCompanyError ? hasExpectedCompanyError.errorCode : false;
  }
  return false;
}

export {
  errorResponseHasInexistentCompany,
  errorResponseInsertCompanyHasExpectedError,
};
