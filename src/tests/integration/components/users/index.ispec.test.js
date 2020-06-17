import {
  errorsCatalog,
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';
import * as externalRequest from '~/src/components/utils/externalRequest';
import {
  getUserCompanyLink,
  insertUserCompanyLink,
  udpateLeadStatus,
  postUser,
  updateUserAsSecure,
  getUserByMobilePhone,
} from '~/src/components/users';
import {
  mockErrorGetUserByPhoneRequest,
  mockGetUserInfoExistedRequest,
  mockGetUserInfoInexistedRequest,
  mockExternalUsersNotExpectedError,
  mockExistentUserCompanyLink,
  mockNonExistentUserRequest,
  mockNonExistentUserCompanyLinkRequest,
  mockResponseUserCompanyLink,
  mockResponseUpdateLeadStatus,
  mockEmailAlredyRegisteredRequest,
  mockUserCreateRequest,
  mockActivateInexistentUserRequest,
  mockUserActivatedRequest,
} from './mockFunctions';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('getUserCompanyLink function', () => {
  test('throws a mocked error when the user does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockNonExistentUserRequest);

    await expect(
      getUserCompanyLink({ userNumber: 1, companyNumber: 99 }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'userNumber',
        '1',
        'InexistentUser',
      ),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  test('throws a mocked error when the user company link does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockNonExistentUserCompanyLinkRequest);

    await expect(
      getUserCompanyLink({ userNumber: 1, companyNumber: 99 }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'companyNumber',
        '9',
        'CompanyNotLinkedToUser',
      ),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  test('throws a mocked error when the users microservice has an unknown error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExternalUsersNotExpectedError);

    await expect(
      getUserCompanyLink({ userNumber: 2, companyNumber: 22 }),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  test('returns a mocked reponse when the user has a link for the company', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExistentUserCompanyLink);

    await expect(
      getUserCompanyLink({ userNumber: 3, companyNumber: 33 }),
    ).resolves.toStrictEqual({
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
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});

describe('insertUserCompanyLink function', () => {
  it('returns a mocked response when when the request is successful', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockResponseUserCompanyLink);

    await expect(
      insertUserCompanyLink({ companyNumber: '208044', branch: '232' }, '511'),
    ).resolves.toStrictEqual({
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
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  it('throws a mocked error when the users microservice has an unknown error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExternalUsersNotExpectedError);

    await expect(
      insertUserCompanyLink({ companyNumber: '208044', branch: '232' }, '511'),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});

describe('udpateLeadStatus function', () => {
  it('returns a mocked response when the request is successful', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockResponseUpdateLeadStatus);

    await expect(
      udpateLeadStatus('511', '20254', 'completed'),
    ).resolves.toStrictEqual({
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
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  it('throws a mocked error when the users microservice has an unknown error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExternalUsersNotExpectedError);
    await expect(
      udpateLeadStatus('511', '20254', 'completed'),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});

describe('postUser function', () => {
  test('throws a mocked error when the an user already exist with one email', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockEmailAlredyRegisteredRequest);

    await expect(
      postUser({
        email: 'fulanito@gmail.com',
        firstName: 'Sam',
        lastName: 'Legion',
        countryCallingCode: '+52',
        mobilePhone: '998877665544',
        confirmationCode: '1234',
        role: 'masterAdmin',
        leadStatus: 'pendingCompanyCreation',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'email',
        'fulanito@gmail.com',
        'EmailAlreadyRegistered',
      ),
    );
    mockExternalResponse.mockReset();
  });
  test('mock create an user successfully', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockUserCreateRequest);

    await expect(
      postUser({
        email: 'usuario@gmail.com',
        firstName: 'Pedro',
        lastName: 'Paramo',
        countryCallingCode: '+52',
        mobilePhone: '5527258173',
        confirmationCode: '5555',
        role: 'masterAdmin',
        leadStatus: 'pendingCompanyCreation',
      }),
    ).resolves.toStrictEqual({
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
    });
    mockExternalResponse.mockReset();
  });
});

describe('updateUserAsSecure function', () => {
  test('throws a mocked error when the try to put an user as secure if it does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockActivateInexistentUserRequest);

    await expect(
      updateUserAsSecure({
        userNumber: 60,
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'userNumber',
        '60',
        'InexistentUser',
      ),
    );
    mockExternalResponse.mockReset();
  });
  test('mock activate an user successfully', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockUserActivatedRequest);

    await expect(
      updateUserAsSecure({
        userNumber: 20,
      }),
    ).resolves.toStrictEqual({
      userNumber: 20,
      userSecurityStatusId: 1,
    });
    mockExternalResponse.mockReset();
  });
});

describe('getUserByMobilePhone function', () => {
  test('throws a mocked error when search for a mobilePhone that already exists on user ms', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockErrorGetUserByPhoneRequest);

    await expect(
      getUserByMobilePhone({
        countryCallingCode: '+55',
        mobilePhone: '15527258173',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '15527258173',
        'ExistentUser',
      ),
    );
    mockExternalResponse.mockReset();
  });
  test('Return false when require user information but it does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockGetUserInfoInexistedRequest);

    await expect(
      getUserByMobilePhone(
        {
          countryCallingCode: '+55',
          mobilePhone: '15527258173',
        },
        true,
      ),
    ).resolves.toStrictEqual({ data: false });
    mockExternalResponse.mockReset();
  });
  test('Return user info when require user information', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockGetUserInfoExistedRequest);

    await expect(
      getUserByMobilePhone(
        {
          countryCallingCode: '+55',
          mobilePhone: '15527258173',
        },
        true,
      ),
    ).resolves.toStrictEqual({
      data: {
        mobilePhone: '15527258173',
        email: 'gr.yocelin+apms11@gmail.com',
        UserStatusId: 1,
      },
    });
    mockExternalResponse.mockReset();
  });
});
