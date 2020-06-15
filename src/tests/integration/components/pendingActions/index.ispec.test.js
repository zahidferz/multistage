import { errorsCatalog, ExternalMicroserviceError } from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import {
  mockErrorCreatedPendingActionsBulkResponse,
  mockSuccesfulCreatedPendingActionsBulkResponse,
  getMockInputData,
} from './mockFunctions';
import createBulkPendingActions from '~/src/components/pendingActions';
import buildInitialPendingActions from '~/src/components/pendingActions/utils';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('createBulkPendingActions function', () => {
  test('returns a succesful mocked response when bulk actions are created correctly', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockSuccesfulCreatedPendingActionsBulkResponse);

    const { mockCompany: company, mockUser: user } = getMockInputData();

    await expect(
      createBulkPendingActions(buildInitialPendingActions(company, user)),
    ).resolves.toStrictEqual([
      {
        pendingItemId: '07F2A225-BCF4-4E94-9770-E69D06691F61',
        pendingTypeId: 13,
        type: 'welcome',
        companyNumber: 202,
        branchNumber: null,
        actionableResourceTypeId: 17,
        actionableResourceType: 'application',
        actionableResourceId: '6224639D-3C91-448F-9DFD-03D21A274836',
        actionableResourceReference: '1170',
        title: 'Te damos la bienvenida',
        description: 'Tu negocio donde quieras con {Chain}.',
        createdBy: 123,
        creationDatetime: '2019-10-14T10:43:00.000Z',
        completedBy: null,
        completionDatetime: null,
        completionAction: null,
        pendingActionDoneId: null,
        actions: [],
        users: ['123'],
        descriptionReferences: [],
      },
      {
        pendingItemId: '36B67891-8B95-447F-B3EB-1E58A1F291DD',
        pendingTypeId: 14,
        type: 'companyUploadInvoicingCertificates',
        companyNumber: 202,
        branchNumber: null,
        actionableResourceTypeId: 4,
        actionableResourceType: 'incomeSales',
        actionableResourceId: '6224639D-3C91-448F-9DFD-03D21A274836',
        actionableResourceReference: '1170',
        title: 'Emite tu primera factura',
        description: 'Sube fácil tus certificados e inicia.',
        createdBy: 123,
        creationDatetime: '2019-10-14T10:43:00.000Z',
        completedBy: null,
        completionDatetime: null,
        completionAction: null,
        pendingActionDoneId: null,
        actions: [],
        users: ['123'],
        descriptionReferences: [],
      },
    ]);
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('throws an error when microservice throws any error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockErrorCreatedPendingActionsBulkResponse);

    const { mockCompany: company, mockUser: user } = getMockInputData();

    await expect(
      createBulkPendingActions(buildInitialPendingActions(company, user)),
    ).rejects.toThrowError(new ExternalMicroserviceError());
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});
