import { errorsCatalog, ExternalMicroserviceError } from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';
import createClient from '~/src/components/clients';
import * as externalRequest from '~/src/components/utils/externalRequest';
import buildGeneralPublicClient from '~/src/components/clients/utils';

import {
  mockClientCreateSuccessResponse,
  mockClientCreateUnkownErrorResponse,
} from './mockFunctions';

describe('createClient function', () => {
  beforeAll(() => {
    errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
  });
  test('returns a succesful mocked response when creating a client', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockClientCreateSuccessResponse);

    const client = buildGeneralPublicClient(99);

    await expect(createClient(client)).resolves.toStrictEqual({
      clientId: '51ECA17A-62D4-4F2E-ABFF-FAE74850A0D2',
      clientNumber: 1,
      companyNumber: 99,
      branchNumber: null,
      taxId: 'XAXX010101000',
      businessName: null,
      commercialName: 'Publico General',
      addressId: null,
      countryCode: 'MEX',
      gln: null,
      clientStatusId: 1,
      clientStatus: 'active',
      registeredDate: '2020-06-10T17:43:48.033Z',
      lastActivity: '2020-06-10T17:43:48.033Z',
      sellOnCredit: null,
      maximumCreditAmount: null,
      maximumCreditCurrency: null,
      maximumCreditDays: null,
      tagValueGroup: 'alto',
      tagActivityBehavior: 'decreciente',
      tagCreditBehavior: 'sin información',
      tagDebLevel: 'sin información',
      tagPaymentBehavior: 'sin información',
      salesQuotesDefaultContactId: null,
      salesOrderDefaultContactId: null,
      salesDefaultContactId: null,
      assignedSalesPersonId: null,
      defaultPriceList: null,
      avatarURL: null,
      color: 32,
      pendingPayment: null,
    });
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('throws an external micorservice error response when creating a client', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockClientCreateUnkownErrorResponse);

    const client = buildGeneralPublicClient(98);

    await expect(createClient(client)).rejects.toThrowError(
      new ExternalMicroserviceError(),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});
