/**
 * Returns a mocked response for
 * a non expected error on permissions microservice
 * @returns {Promise}
 */
async function mockPermissionsNotExpectedError() {
  const mockResponse = {
    response: {
      data: {
        message: 'Forbidden Error',
        errors: [
          {
            field: 'userNumber',
            fieldValue: 11150,
            errorCode: 12,
            errorType: 'error',
            errorMessage: "You don't have permissions to this company",
          },
        ],
        microservice: 'gx-boa-ms-permissions',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * set profile request on permissions microservice
 * @returns {Promise}
 */
async function mockPermissionsResponseSetProfile() {
  const mockResponse = {
    data: {
      userNumber: 10215,
      companyNumber: 208034,
      profile: 'administrator',
      id: '83eba8aa-bfed-56fc-2cb5-49d4e802bdc8',
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

export { mockPermissionsNotExpectedError, mockPermissionsResponseSetProfile };
