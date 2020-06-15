/**
 * Returns a mocked response for
 * a non existent company on companies microservice
 * @returns {Promise}
 */
async function mockNonExistentCompanyResponse() {
  const mockResponse = {
    response: {
      data: {
        message: 'Not found error',
        errors: [
          {
            field: 'companyNumber',
            fieldValue: '98',
            errorCode: 10,
            errorType: 'error',
            errorMessage: 'Company does not exist',
          },
        ],
        statusCode: 404,
        microservice: 'gx-boa-ms-companies',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * an existent company on companies
 * microservice
 * @returns {Promise}
 */
async function mockExistentCompanyResponse() {
  const mockResponse = {
    data: {
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
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response for
 * a non expected error on companies microservice
 * @returns {Promise}
 */
async function mockCompaniesNotExpectedError() {
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
        microservice: 'gx-boa-ms-companies',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response
 * when the company is successfully created
 * @returns {Promise}
 */
async function mockCreateCompanyResponse() {
  const mockResponse = {
    data: {
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
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

/**
 * Returns a mocked response when
 * a company already exists with the given taxId
 * @returns {Promise}
 */
async function mockCompanyAlreadyExistError() {
  const mockResponse = {
    response: {
      data: {
        message: 'Bad request error',
        errors: [
          {
            field: 'taxId',
            fieldValue: 'ZARB9912053Y4',
            errorCode: 11,
            errorType: 'error',
            errorMessage: 'TaxId and CountryCode already exists',
          },
        ],
        statusCode: 400,
        microservice: 'gx-boa-ms-companies',
      },
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

/**
 * Returns a mocked response for the
 * company patch by company number
 * @returns
 */
async function mockCompanyUpdateResponse() {
  const mockResponse = {
    data: {
      companyId: '7F3A004D-9AC8-42A8-98C1-B9742EBCD3F7',
      companyNumber: '98',
      taxId: 'TEST7608212V6',
      legalName: 'TEST7608212V6',
      commercialName: 'TEST7608212V6',
      countryCode: 'MEX',
      companyStatus: 'active',
      color: 15,
      companyLogo: null,
      companyDocumentsLogo: null,
      creationDate: '2020-03-11T16:45:21.943Z',
      fiscalAddress: '199',
      commercialAddress: '100',
      subscriptionNumber: '202006434898',
      IANAHusoHorario: 'America/Mexico_City',
      ReferenciasDelHusoHorario: 'Tiempo del Centro',
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

export {
  mockCreateCompanyResponse,
  mockCompanyAlreadyExistError,
  mockCompaniesNotExpectedError,
  mockCompanyUpdateResponse,
  mockExistentCompanyResponse,
  mockNonExistentCompanyResponse,
};
