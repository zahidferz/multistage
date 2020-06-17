import {
  AuthorizationError,
  errorsCatalog,
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import { introspectToken, createAccount, logIn } from '~/src/components/auth';
import {
  mockAuthorizationError,
  mockCreateAccountResponse,
  mockCreateAccountConfictErrorResponse,
  mockIntrospectTokenResponse,
  mockExternalAuthNotExpectedError,
  mockLogInResponse,
  mockLogInErrorResponse,
  mockUserDoNotExistErrorResponse,
  userCreated,
} from './mockFunctions';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('introspectToken function', () => {
  it('returns a mocked response for introspect token', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockIntrospectTokenResponse);

    await expect(
      introspectToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEYzJORUpGUWpRelJUaEJNRVl6UWpsRE9UYzFSVVJDUlRSR1JFTXdSVUkzUlRKRU9UVTFSUSJ9',
      ),
    ).resolves.toStrictEqual({
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
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });

  it('throws a mocked error when the users microservice has an authorization error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockAuthorizationError);
    await expect(
      introspectToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEYzJORUpGUWpRelJUaEJNRVl6UWpsRE9UYzFSVVJDUlRSR1JFTXdSVUkzUlRKRU9UVTFSUSJ9',
      ),
    ).rejects.toThrowError(new AuthorizationError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });

  it('throws a mocked error when the users microservice has an unexpected error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExternalAuthNotExpectedError);
    await expect(
      introspectToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEYzJORUpGUWpRelJUaEJNRVl6UWpsRE9UYzFSVVJDUlRSR1JFTXdSVUkzUlRKRU9UVTFSUSJ9',
      ),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });
});

describe('createAccount function', () => {
  it('returns a mocked response for createAccount', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCreateAccountResponse);

    await expect(createAccount(userCreated)).resolves.toStrictEqual({
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
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });

  it('throws a mocked error when the user is already registered on auth0', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockUserDoNotExistErrorResponse)
      .mockImplementationOnce(mockCreateAccountConfictErrorResponse);
    await expect(createAccount(userCreated)).rejects.toThrowError();

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });
});

describe('logIn function', () => {
  it('returns a mocked response for logIn. Success case', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockLogInResponse);

    await expect(
      logIn(
        { email: 'gr.yocelin+apms11@gmail.com' },
        { password: 'Gestionix01' },
      ),
    ).resolves.toStrictEqual({
      access_token: 'To4TqbeMjKdeAADaEIUUyPF41I5ix1KV',
      refresh_token: 'XNkcUmSKl0aqOv60eI_wppEQ4rF2HHuz_11EStlRhz_PT',
      id_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEYzJORUpGUWpRelJUaEJNRVl6UWpsRE9UYzFSVVJDUlRSR1JFTXdSVUkzUlRKRU9UVTFSUSJ9.eyJodHRwczovL3VzZXJfbWV0YWRhdGEvIjp7InVzZXJOdW1iZXIiOiIxMTc2MCIsImNvdW50cnlDb2RlIjoiTVhOIn0sIm5pY2tuYW1lIjoiZ3IueW9jZWxpbithcG1zMTEiLCJuYW1lIjoiWW9jZWxpbiBHYXJjaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNWM5NWFiNGUxZjE1M2M4YTAzZDRjNjVjZWQzODI3ZDM_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ5Zy5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNi0xNVQxNjoxMTowOS43ODNaIiwiZW1haWwiOiJnci55b2NlbGluK2FwbXMxMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9nZXN0aW9uaXguYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDJGRjEzRjZDLUVGNEEtNEUzQS04OTU3LTU1QzdDNEU2MzY3NSIsImF1ZCI6ImtXN0hseXRmQWhNa0I1NEhkVk4xNEFXM1M0bUYxeE11IiwiaWF0IjoxNTkyMjM3NDY5LCJleHAiOjE1OTIyNzM0Njl9.fQ2HERepHZVFUL34Y2YpB7x_IWhBDNNjmU7h6BKNXsuTJRL6ozywVQU2GT2W2VW6Zs-0HabLmsl_XGJyxJOuMHhhHg0LSY3S5AuZqsX-4yq5Mu0-xb4iN0fTXrMdnTXinESPsgy0jVds8zgrykvADawOjDqzE94BwdRmqjdscIOJyS2oMCCE2PkgNy9-Wlmm0Pg5gWuOWPS8BcKrXwc6bsz6QhdXfn9p1iQ8DOjp118TTTVLilulVsg0me06waanoIbuM6anTBQ2VfP1qVnD3nySnGKkONLv_lgn2-mioHb2y5DEf6qOHNngFmxROIwhwCLjF1risylLD9fMlrydHA',
      scope: 'openid profile email address phone offline_access',
      expires_in: 86400,
      token_type: 'Bearer',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });

  it('throws a mocked error when try to log in to an account', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockLogInErrorResponse);
    await expect(
      logIn(
        { email: 'gr.yocelin+apms11@gmail.com' },
        { password: 'Gestionix01' },
      ),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'email/password',
        '',
        'SignInError',
      ),
    );

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockRestore();
  });
});
