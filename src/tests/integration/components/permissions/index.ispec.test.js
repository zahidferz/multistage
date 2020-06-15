import { errorsCatalog, ExternalMicroserviceError } from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import {
  mockPermissionsNotExpectedError,
  mockPermissionsResponseSetProfile,
} from './mockFunctions';
import { setUserProfile } from '~/src/components/permissions';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('setUserProfile function', () => {
  it('returns a mocked response when profile is set successfully', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockPermissionsResponseSetProfile);

    await expect(
      setUserProfile(
        {
          companyNumber: '208034',
          userNumber: '10215',
          branchNumber: null,
        },
        '',
      ),
    ).resolves.toStrictEqual({
      userNumber: 10215,
      companyNumber: 208034,
      profile: 'administrator',
      id: '83eba8aa-bfed-56fc-2cb5-49d4e802bdc8',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  it('throws a mocked error when the users microservice has an unknown error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockPermissionsNotExpectedError);
    await expect(
      setUserProfile(
        {
          companyNumber: '511',
          userNumber: '11150',
          branchNumber: null,
        },
        '',
      ),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});
