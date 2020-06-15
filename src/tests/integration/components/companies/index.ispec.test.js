import {
  errorsCatalog,
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import {
  getCompanyByNumber,
  updateSubscriptionNumber,
  insertCompany,
} from '~/src/components/companies';
import {
  mockCreateCompanyResponse,
  mockCompanyAlreadyExistError,
  mockCompaniesNotExpectedError,
  mockCompanyUpdateResponse,
  mockExistentCompanyResponse,
  mockNonExistentCompanyResponse,
} from './mockFunctions';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('getCompanyByNumber function', () => {
  test('throws a mocked error when the company does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockNonExistentCompanyResponse);

    await expect(
      getCompanyByNumber({ companyNumber: '98' }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'companyNumber',
        '98',
        'InexistentCompany',
      ),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('returns a mocked reponse when the company exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockExistentCompanyResponse);

    await expect(
      getCompanyByNumber({ companyNumber: '99' }),
    ).resolves.toStrictEqual({
      companyId: '7F3A004D-9AC8-42A8-98C1-B9742EBCD3F7',
      companyNumber: '99',
      taxId: 'JUFA7608212V6',
      legalName: 'JUFA7608212V6',
      commercialName: 'JUFA7608212V6',
      countryCode: 'MEX',
      companyStatus: 'active',
      color: 15,
      companyLogo: null,
      companyDocumentsLogo: null,
      creationDate: '2020-03-11T16:45:21.943Z',
      fiscalAddress: {
        addressId: 'F3D58D97-85C2-40FD-BF9C-AC48A77B1CB1',
        addressNumber: '12799',
        street: 'Av Del Rejon',
        outsideNumber: '157',
        insideNumber: 'Int 2',
        neighborhood: 'Industrial',
        municipality: 'Benito Juarez',
        city: 'Mexico',
        state: 'Mexico',
        country: 'Mexico',
        countryCode: 'MEX',
        postalCode: '03840',
        reference: 'Principal',
        fullAddress: null,
      },
      commercialAddress: '12800',
      subscriptionNumber: '111-200399',
      IANAHusoHorario: 'America/Mexico_City',
      ReferenciasDelHusoHorario: 'Tiempo del Centro',
      dataLocalized: {
        companyNumber: '99',
        regimenFiscalNombre:
          'Personas Físicas con Actividades Empresariales y Profesionales',
        regimenFiscalCodigo: 612,
        curp: null,
        registroPatronal: null,
        ciecConfigurada: null,
        ciecConfiguradaFecha: null,
        connectionId: null,
      },
      digitalCertificates: [
        {
          companyNumber: '99',
          certificateNumber: '30001000000400002331',
          certificateToken:
            '863f4b2b6024f7b59ee4c63ebd4d0c3795a74d88dfe5fe4fb6376b2cee50e1ac',
          registeredDate: '2020-03-11T16:54:59.813Z',
          expirationDate: '2023-05-29T18:42:25.000Z',
          certificateStatus: 'valid',
          certificateType: 'CSD',
          countryCode: 'MEX',
        },
      ],
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('throws a mocked error when the companies microservice thows an unexpected error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCompaniesNotExpectedError);

    await expect(
      getCompanyByNumber({ companyNumber: '22' }),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});

describe('insertCompany function', () => {
  it('throws a mocked error when already exist a company with the given taxId', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCompanyAlreadyExistError);

    await expect(
      insertCompany({ taxId: 'ZARB9912053Y4', legalName: 'experimenta' }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'taxId',
        'ZARB9912053Y4',
        'TaxIdAlreadyExist',
      ),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  it('throws a mocked response when the company is successfully created', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCreateCompanyResponse);

    await expect(
      insertCompany({ taxId: 'ZARB9912053Y4', legalName: 'experimenta' }),
    ).resolves.toStrictEqual({
      companyNumber: '208044',
      companyId: '51238CAB-E10B-4A7C-BA2C-4A46171878CD',
      taxId: 'ZARB9912053Y4',
      legalName: 'experimenta',
      commercialName: null,
      countryCode: 'MEX',
      companyStatus: 'active',
      color: 46,
      companyLogo: null,
      companyDocumentsLogo: null,
      creationDate: '2020-06-08T17:28:18.743Z',
      fiscalAddress: '15811',
      commercialAddress: '15812',
      subscriptionNumber: null,
      branch: {
        companyNumber: '208044',
        branchId: 'DB4EC7AA-5088-40D6-8ABE-52132193FA54',
        branchNumber: '16217',
        name: 'experimenta',
        shortName: null,
        description: null,
        branchType: 'store',
        branchStatus: 'active',
        countryCode: 'MEX',
        address: null,
        creationDate: '2020-06-08T17:28:18.787Z',
      },
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});

describe('updateSubscriptionNumber function', () => {
  test('returns a mocked reponse of a succesful external request', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCompanyUpdateResponse);

    await expect(
      updateSubscriptionNumber(98, '202006434898'),
    ).resolves.toStrictEqual({
      IANAHusoHorario: 'America/Mexico_City',
      ReferenciasDelHusoHorario: 'Tiempo del Centro',
      color: 15,
      commercialAddress: '100',
      commercialName: 'TEST7608212V6',
      companyDocumentsLogo: null,
      companyId: '7F3A004D-9AC8-42A8-98C1-B9742EBCD3F7',
      companyLogo: null,
      companyNumber: '98',
      companyStatus: 'active',
      countryCode: 'MEX',
      creationDate: '2020-03-11T16:45:21.943Z',
      fiscalAddress: '199',
      legalName: 'TEST7608212V6',
      subscriptionNumber: '202006434898',
      taxId: 'TEST7608212V6',
    });
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('throws an error when the company number provided does not exist', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockNonExistentCompanyResponse);

    await expect(
      updateSubscriptionNumber(98, '202006434898'),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'companyNumber',
        '98',
        'InexistentCompany',
      ),
    );
    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
  test('throws an exteral microservice error when the response is not a expected error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementation(mockCompaniesNotExpectedError);

    await expect(
      updateSubscriptionNumber(99, '202006434898'),
    ).rejects.toThrowError(new ExternalMicroserviceError());

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });
});
