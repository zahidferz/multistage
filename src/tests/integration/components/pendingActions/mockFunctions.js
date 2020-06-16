function mockSuccesfulCreatedPendingActionsBulkResponse() {
  const response = {
    data: [
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
    ],
  };

  return new Promise((resolve) => resolve(response));
}

function mockErrorCreatedPendingActionsBulkResponse() {
  return new Promise((resolve, reject) => reject(new Error('Error')));
}

function getMockInputData() {
  const mockCompany = {
    companyNumber: 202,
    companyId: '6224639D-3C91-448F-9DFD-01D21A274832',
    commercialName: 'La prueba',
  };
  const mockUser = {
    userId: '0B6ECE7A-7176-4318-BBA8-376E36E30290',
    userNumber: 123,
    userCompleteName: 'Usuario la prueba',
  };

  return {
    mockCompany,
    mockUser,
  };
}

export {
  getMockInputData,
  mockErrorCreatedPendingActionsBulkResponse,
  mockSuccesfulCreatedPendingActionsBulkResponse,
};
