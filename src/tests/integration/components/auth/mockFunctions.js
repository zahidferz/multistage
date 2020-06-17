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

/**
 * Returns a mocked response for
 * log in account on auth microservice
 * @returns {Promise}
 */
async function mockLogInResponse() {
  const mockResponse = {
    data: {
      access_token: 'To4TqbeMjKdeAADaEIUUyPF41I5ix1KV',
      refresh_token: 'XNkcUmSKl0aqOv60eI_wppEQ4rF2HHuz_11EStlRhz_PT',
      id_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEYzJORUpGUWpRelJUaEJNRVl6UWpsRE9UYzFSVVJDUlRSR1JFTXdSVUkzUlRKRU9UVTFSUSJ9.eyJodHRwczovL3VzZXJfbWV0YWRhdGEvIjp7InVzZXJOdW1iZXIiOiIxMTc2MCIsImNvdW50cnlDb2RlIjoiTVhOIn0sIm5pY2tuYW1lIjoiZ3IueW9jZWxpbithcG1zMTEiLCJuYW1lIjoiWW9jZWxpbiBHYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNWM5NWFiNGUxZjE1M2M4YTAzZDRjNjVjZWQzODI3ZDM_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ5Zy5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNi0xNVQxNjoxMTowOS43ODNaIiwiZW1haWwiOiJnci55b2NlbGluK2FwbXMxMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9nZXN0aW9uaXguYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDJGRjEzRjZDLUVGNEEtNEUzQS04OTU3LTU1QzdDNEU2MzY3NSIsImF1ZCI6ImtXN0hseXRmQWhNa0I1NEhkVk4xNEFXM1M0bUYxeE11IiwiaWF0IjoxNTkyMjM3NDY5LCJleHAiOjE1OTIyNzM0Njl9.fQ2HERepHZVFUL34Y2YpB7x_IWhBDNNjmU7h6BKNXsuTJRL6ozywVQU2GT2W2VW6Zs-0HabLmsl_XGJyxJOuMHhhHg0LSY3S5AuZqsX-4yq5Mu0-xb4iN0fTXrMdnTXinESPsgy0jVds8zgrykvADawOjDqzE94BwdRmqjdscIOJyS2oMCCE2PkgNy9-Wlmm0Pg5gWuOWPS8BcKrXwc6bsz6QhdXfn9p1iQ8DOjp118TTTVLilulVsg0me06waanoIbuM6anTBQ2VfP1qVnD3nySnGKkONLv_lgn2-mioHb2y5DEf6qOHNngFmxROIwhwCLjF1risylLD9fMlrydHA',
      scope: 'openid profile email address phone offline_access',
      expires_in: 86400,
      token_type: 'Bearer',
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked error for
 * wrong password
 * @returns {Promise}
 */
async function mockLogInErrorResponse() {
  const mockResponse = {
    response: {
      data: {
        error: 'invalid_grant',
        error_description: 'Wrong email or password.',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked error for
 * authorization missing
 * @returns {Promise}
 */
async function mockAuthErrorTranslateResponse() {
  const mockResponse = [
    {
      errorCode: 14,
      errorMessage: 'Authorization missing for service',
      errorType: 'error',
      field: 'authorization',
      fieldValue: null,
    },
  ];
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

export {
  mockAuthorizationError,
  mockAuthErrorTranslateResponse,
  mockCreateAccountResponse,
  mockCreateAccountConfictErrorResponse,
  mockCreateAccountPasswordErrorResponse,
  mockExternalAuthNotExpectedError,
  mockIntrospectTokenResponse,
  mockLogInResponse,
  mockLogInErrorResponse,
  mockUserDoNotExistErrorResponse,
  userCreated,
};
