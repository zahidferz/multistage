/**
 * Evaluates if the response from companies have
 * an error code 11 that indicates duplicated company
 * mobile phone
 * @param {Object} data data object response from axios
 * @returns {Boolean}
 */
function errorResponseTaxIdAlreadyExist({ data }) {
  if (data.errors) {
    const taxIdAlreadyExist = data.errors.find(
      ({ errorCode }) => errorCode === 11,
    );
    return !!taxIdAlreadyExist;
  }
  return false;
}

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

export { errorResponseTaxIdAlreadyExist, errorResponseHasInexistentCompany };
