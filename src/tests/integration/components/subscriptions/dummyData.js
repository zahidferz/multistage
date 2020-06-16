const createSubscriptionDummyData = {
  subscription: {
    planSku: 'GX-NEG-TP',
    createdby: 'account-provisioning.gestionix.com',
    createdIp: '0.0.0.0',
    createdFrom: 'account-provisioning.gestionix.com',
    createdBy: 'account-provisioning.gestionix.com',
  },
  seller: {
    sellerId: 2,
  },
  user: {
    email: 'test@test.com',
    mobilePhone: '+526142858208',
    userCompleteName: 'Roberto Garcia',
  },
  company: {
    companyNumber: 206096,
    taxId: 'TEST9103055UX',
    legalName: 'Test Acc Provisioning',
    commercialName: 'Test Acc Provisioning S. de R.L de C.V',
  },
};

const createSubscriptionInvalidSellerId = {
  subscription: {
    planSku: 'GX-NEG-TP',
    createdby: 'account-provisioning.gestionix.com',
    createdIp: '0.0.0.0',
    createdFrom: 'account-provisioning.gestionix.com',
    createdBy: 'account-provisioning.gestionix.com',
  },
  seller: {
    sellerId: 0,
  },
  user: {
    email: 'test@test.com',
    mobilePhone: '+526142858208',
    userCompleteName: 'Roberto Garcia',
  },
  company: {
    companyNumber: 206096,
    taxId: 'TEST9103055UX',
    legalName: 'Test Acc Provisioning',
    commercialName: 'Test Acc Provisioning S. de R.L de C.V',
  },
};

const createSubscriptionInvalidSellerPlan = {
  subscription: {
    planSku: 'NA',
    createdby: 'account-provisioning.gestionix.com',
    createdIp: '0.0.0.0',
    createdFrom: 'account-provisioning.gestionix.com',
    createdBy: 'account-provisioning.gestionix.com',
  },
  seller: {
    sellerId: 2,
  },
  user: {
    email: 'test@test.com',
    mobilePhone: '+526142858208',
    userCompleteName: 'Roberto Garcia',
  },
  company: {
    companyNumber: 206096,
    taxId: 'TEST9103055UX',
    legalName: 'Test Acc Provisioning',
    commercialName: 'Test Acc Provisioning S. de R.L de C.V',
  },
};

export {
  createSubscriptionDummyData,
  createSubscriptionInvalidSellerId,
  createSubscriptionInvalidSellerPlan,
};
