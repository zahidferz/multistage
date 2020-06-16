/**
 * Returns a mocked response for
 * a non existent user on users microservice
 * @returns {Promise}
 */
async function mockNonExistentUserRequest() {
  const mockResponse = {
    response: {
      data: {
        message: 'Not found error',
        errors: [
          {
            field: 'userNumber',
            fieldValue: '1',
            errorCode: 10,
            errorType: 'error',
            errorMessage: 'User does not exist',
          },
        ],
        statusCode: 404,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a non existent user company link on users microservice
 * @returns {Promise}
 */
async function mockNonExistentUserCompanyLinkRequest() {
  const mockResponse = {
    response: {
      data: {
        message: 'Bad request error',
        errors: [
          {
            field: 'companyNumber',
            fieldValue: '99',
            errorCode: 11,
            errorType: 'error',
            errorMessage: 'Company not linked to user',
          },
        ],
        statusCode: 400,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a non expected error on users microservice
 * @returns {Promise}
 */
async function mockExternalUsersNotExpectedError() {
  const mockResponse = {
    response: {
      data: {
        message: 'Not expected error',
        errors: [
          {
            field: 'companyNumber',
            fieldValue: '99',
            errorCode: 999,
            errorType: 'error',
          },
        ],
        statusCode: 400,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a valid user company link on users
 * microservice
 * @returns {Promise}
 */
async function mockExistentUserCompanyLink() {
  const mockResponse = {
    data: {
      companyNumber: '33',
      userCompanyStatus: 'active',
      statusId: 1,
      isFavorite: null,
      defaultBranchNumber: '15',
      userCompanyPreferences: {
        userCompanyPreferencesId: 'B93C14D2-86EA-44ED-81BF-99C93E00426C',
        salesSummaryDefaultView: 'month',
        spendingSummaryDefaultView: 'month',
      },
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**

 * Returns a mocked response
 * when the user company link is created successfully
 * on users microservice
 * @returns {Promise}
 */
async function mockResponseUserCompanyLink() {
  const mockResponse = {
    data: {
      userNumber: '511',
      companyNumber: '208044',
      userCompanyStatus: 'active',
      defaultBranchNumber: '232',
      isFavorite: false,
      userCompanyPreferences: {
        userCompanyPreferencesId: '7B0D9795-0D27-4270-BA21-3EE50EADE822',
        salesSummaryDefaultView: 'month',
        spendingSummaryDefaultView: 'month',
      },
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response
 * when the lead status is updated successfully
 * on users microservice
 * @returns {Promise}
 */
async function mockResponseUpdateLeadStatus() {
  const mockResponse = {
    data: {
      userId: '6224639D-3C91-448F-9DFD-01D21A274832',
      userNumber: '511',
      email: 'example2@gmail.com',
      firstName: 'Patrick',
      lastName: 'Jane',
      userCompleteName: 'Patrick Jane',
      countryCallingCode: null,
      mobilePhone: null,
      phone: '98765432',
      jobTitle: 'Employee',
      userStatus: 'active',
      userSecurityStatus: 'secured',
      securityStatusId: 1,
      creationDate: '2020-01-09T19:18:52.200Z',
      color: 1,
      image: null,
      confirmationCode: null,
      role: 'admin',
      leadStatus: 'completed',
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a error on users microservice
 * because of email already registeres
 * @returns {Promise}
 */
async function mockEmailAlredyRegisteredRequest() {
  const mockResponse = {
    response: {
      data: {
        message: 'Unprocessable entity error',
        errors: [
          {
            field: 'email',
            fieldValue: 'fulanito@gmail.com',
            errorCode: 13,
            errorType: 'error',
          },
        ],
        statusCode: 422,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * create an user on user service
 * @returns {Promise}
 */
async function mockUserCreateRequest() {
  const mockResponse = {
    userId: '6FEB8E24-5333-4309-BBD6-C1E6595C9672',
    userNumber: 25,
    email: 'usuario@gmail.com',
    firstName: 'Pedro',
    lastName: 'Paramo',
    userCompleteName: 'Pedro Paramo',
    mobilePhone: '5527258173',
    phone: '',
    jobTitle: '',
    userStatus: 'active',
    userSecurityStatus: 'not activated',
    securityStatusId: 2,
    creationDate: '2020-06-09T05:00:00.000Z',
    color: 15,
    image: '',
    confirmationCode: '5555',
    role: 'masterAdmin',
    leadStatus: 'pendingCompanyCreation',
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a error on users microservice
 * because of inexistent user
 * @returns {Promise}
 */
async function mockActivateInexistentUserRequest() {
  const mockResponse = {
    response: {
      data: {
        message: 'Unprocessable entity error',
        errors: [
          {
            field: 'userNumber',
            fieldValue: '60',
            errorCode: 10,
            errorType: 'error',
          },
        ],
        statusCode: 422,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * activate an user on user service
 * @returns {Promise}
 */
async function mockUserActivatedRequest() {
  const mockResponse = {
    data: {
      userNumber: 20,
      userSecurityStatusId: 1,
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a get user by email when
 * results emit from the search
 * @returns {Promise}
 */
async function mockGetUserByEmailWithResult() {
  const mockResponse = {
    data: {
      userId: 'AF153044-A7C3-420B-9E79-40B9CA92E960',
      userNumber: '11758',
      email: 'wicho.91+059@gmail.com',
      firstName: 'Luis',
      lastName: 'Maldonado',
      userCompleteName: 'Luis Maldonado',
      countryCallingCode: '+52 ',
      mobilePhone: '6142858215',
      phone: null,
      jobTitle: null,
      userStatus: 'active',
      userSecurityStatus: 'secured',
      securityStatusId: 1,
      creationDate: '2020-06-11T23:06:35.570Z',
      color: 16,
      image: null,
      confirmationCode: '8356',
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * unexpected error on users microservice
 * @returns {Promise}
 */
async function mockUnexpectedError() {
  const mockResponse = {
    response: {
      data: 'Error',
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a error on users microservice
 * because of existent user on get by mobile phone
 * @returns {Promise}
 */
async function mockErrorGetUserByPhoneRequest() {
  const mockResponse = {
    response: {
      data: {
        message: 'Unprocessable entity error',
        errors: [
          {
            field: 'mobilePhone',
            fieldValue: '15527258173',
            errorCode: 18,
            errorType: 'error',
            errorMessage: 'The specified mobile phone is already registered',
          },
        ],
        statusCode: 422,
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * get user data by mobile phone
 * @returns {Promise}
 */
async function mockGetUserInfoInexistedRequest() {
  const mockResponse = {
    data: false,
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * get user data by mobile phone
 * @returns {Promise}
 */
async function mockGetUserInfoExistedRequest() {
  const mockResponse = {
    data: {
      mobilePhone: '15527258173',
      email: 'gr.yocelin+apms11@gmail.com',
      UserStatusId: 1,
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

export {
  mockErrorGetUserByPhoneRequest,
  mockGetUserInfoExistedRequest,
  mockGetUserInfoInexistedRequest,
  mockActivateInexistentUserRequest,
  mockEmailAlredyRegisteredRequest,
  mockExternalUsersNotExpectedError,
  mockExistentUserCompanyLink,
  mockGetUserByEmailWithResult,
  mockNonExistentUserRequest,
  mockNonExistentUserCompanyLinkRequest,
  mockResponseUserCompanyLink,
  mockResponseUpdateLeadStatus,
  mockUnexpectedError,
  mockUserCreateRequest,
  mockUserActivatedRequest,
};
