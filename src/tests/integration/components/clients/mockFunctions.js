async function mockClientCreateSuccessResponse() {
  const mockResponse = {
    data: {
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
    },
  };
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

async function mockClientCreateUnkownErrorResponse() {
  const mockResponse = {
    response: {
      data: 'Error',
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

export { mockClientCreateSuccessResponse, mockClientCreateUnkownErrorResponse };
