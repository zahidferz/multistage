/**
 * Returns a mocked response for
 * introspect on auth microservice
 * @returns {Promise}
 */
async function mockIntrospectTokenResponse() {
  const mockResponse = {
    data: {
      created_at: '2020-03-11T16:45:24.054Z',
      email: 'test@gmail.com',
      email_verified: true,
      identities: [
        {
          user_id: 'CAF7D922-F3E8-4BDC-AC6A-352C852B1A99',
          provider: 'auth0',
          connection: 'Eleva-Auth-Dev',
          isSocial: false,
        },
      ],
      name: 'Brenda S',
      nickname: 'test@gmail.com',
      picture: 'https://s.gravatar.com/avatar/0315a9cc241d357.png',
      updated_at: '2020-06-08T16:01:24.089Z',
      user_id: 'auth',
      user_metadata: {
        userNumber: '10215',
        countryCode: 'MEX',
      },
      last_ip: '13.65.174.81',
      last_login: '2020-06-08T16:01:24.089Z',
      logins_count: 86,
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * an authorizatin  error on auth microservice
 * @returns {Promise}
 */
async function mockAuthorizationError() {
  const mockResponse = {
    response: {
      data: {
        message: 'Unauthorized',
        errors: {
          field: 'id_token',
          errorCode: 11,
          errorType: 'error',
          errorMessage: 'Missing authentication',
        },
        statusCode: 401,
        microservice: 'gx-boa-auth',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a non expected error on auth microservice
 * @returns {Promise}
 */
async function mockExternalAuthNotExpectedError() {
  const mockResponse = {
    response: {
      data: {
        message: 'Validation error',
        errors: [
          {
            field: 'id_token',
            errorCode: 1,
            errorType: 'error',
            errorMessage: '{id_token} is required',
          },
        ],
        microservice: 'gx-boa-auth',
        statusCode: 400,
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

const userCreated = {
  userId: '4D1A2694-96B4-4374-8FDF-10F102E178C7',
  userNumber: '11697',
  email: 'gr.yocelin+apms2@gmail.com',
  firstName: 'Yocelin',
  lastName: 'Garcia',
  userCompleteName: 'Yocelin Garcia',
  countryCallingCode: '+52',
  mobilePhone: '15527258173',
  phone: null,
  jobTitle: null,
  userStatus: 'deleted',
  userSecurityStatus: 'notActivated',
  securityStatusId: 2,
  creationDate: '2020-06-10T14:30:33.150Z',
  color: 29,
  image: null,
  confirmationCode: '4245',
  role: 'admin',
  leadStatus: 'pendingCompanyCreation',
  password: 'Strongpassword1',
};

/**
 * Returns a mocked response for
 * create account on auth microservice
 * @returns {Promise}
 */
async function mockCreateAccountResponse() {
  const mockResponse = {
    data: {
      created_at: '2020-06-10T19:10:23.162Z',
      email: 'gr.yocelin+apms9@gmail.com',
      email_verified: true,
      identities: [
        {
          user_id: '264F894B-891D-4975-8E52-40D74EC28910',
          connection: 'Eleva-Auth-Dev',
          provider: 'auth0',
          isSocial: false,
        },
      ],
      name: 'Yocelin Garcia',
      nickname: 'gr.yocelin+apms9',
      picture:
        'https://s.gravatar.com/avatar/d0d8186a7492c83fceae748661782de2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fyg.png',
      updated_at: '2020-06-10T19:10:23.162Z',
      user_id: 'auth0|264F894B-891D-4975-8E52-40D74EC28910',
      user_metadata: { userNumber: '11715', countryCode: 'MXN' },
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked error for
 * an existed user on auth0
 * @returns {Promise}
 */
async function mockCreateAccountConfictErrorResponse() {
  const mockResponse = {
    response: {
      data: {
        statusCode: 409,
        error: 'Conflict',
        message: 'The user already exists.',
        errorCode: 'auth0_idp_error',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked error for
 * a wrong password
 * @returns {Promise}
 */
async function mockCreateAccountPasswordErrorResponse() {
  const mockResponse = {
    response: {
      data: {
        message: 'Bad Request Error',
        errors: [
          {
            field: 'password',
            fieldValue: 'hol',
            errorCode: 18,
            errorType: 'error',
            errorMessage: 'PasswordStrengthError: Password is too weak',
          },
        ],
        microservice: 'gx-boa-ms-account-provisioning',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked error for
 * not existent user
 * @returns {Promise}
 */
async function mockUserDoNotExistErrorResponse() {
  const mockResponse = {
    response: {
      data: {
        message: 'Not Found Error',
        errors: [
          {
            field: 'userNumber',
            fieldValue: 11715,
            errorCode: 10,
            errorType: 'error',
            errorMessage: 'User does not exist',
          },
        ],
        microservice: 'gx-boa-ms-users',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

export {
  mockAuthorizationError,
  mockCreateAccountResponse,
  mockCreateAccountConfictErrorResponse,
  mockCreateAccountPasswordErrorResponse,
  mockExternalAuthNotExpectedError,
  mockIntrospectTokenResponse,
  mockUserDoNotExistErrorResponse,
  userCreated,
};
