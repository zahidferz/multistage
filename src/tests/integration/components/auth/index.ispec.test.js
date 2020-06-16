import {
  AuthorizationError,
  errorsCatalog,
  ExternalMicroserviceError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import { introspectToken, createAccount } from '~/src/components/auth';
import {
  mockAuthorizationError,
  mockCreateAccountResponse,
  mockCreateAccountConfictErrorResponse,
  mockIntrospectTokenResponse,
  mockExternalAuthNotExpectedError,
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
    mockExternalResponse.mockReset();
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
    mockExternalResponse.mockReset();
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
    mockExternalResponse.mockReset();
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
    mockExternalResponse.mockReset();
  });

  it('throws a mocked error when the user is already registered on auth0', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockUserDoNotExistErrorResponse)
      .mockImplementationOnce(mockCreateAccountConfictErrorResponse);
    await expect(createAccount(userCreated)).rejects.toThrowError();

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});
