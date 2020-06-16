const insertLeadDummyData = {
  mobilePhone: '5555555555',
  countryCallingCode: '+52',
  name: 'Yocelin',
  lastName: 'Garcia',
  email: 'insertRegister@gmail.com',
  encodedPassword:
    '$2b$10$xFBuYJaEWYncxS.NwNy1Ou3grpVHAzzPPAt0Hcbv1Aymcla7.gpve',
  confirmationCode: '0000',
};
const insertLeadAsConfirmedDummyData = {
  mobilePhone: '5555555555',
  countryCallingCode: '+52',
  name: 'Yocelin',
  lastName: 'Garcia',
  email: 'insertRegister@gmail.com',
  encodedPassword:
    '$2b$10$xFBuYJaEWYncxS.NwNy1Ou3grpVHAzzPPAt0Hcbv1Aymcla7.gpve',
  confirmationCode: '0000',
  confirmed: 1,
};
const confirmLeadEndpoint = {
  body: {
    mobilePhone: '15527258173',
    countryCallingCode: '+52',
    confirmationCode: '4938',
    agreedTermsAndConditions: true,
  },
  params: {},
  query: {
    sendWhatsAppNotification: true,
    sendSlackNotification: true,
  },
};
const confirmLeadEndpointWrongData = {
  body: {
    mobilePhone: '15527258173',
    countryCallingCode: '52',
    confirmationCode: '4938',
    agreedTermsAndConditions: true,
  },
  params: {},
  query: {
    sendWhatsAppNotification: true,
    sendSlackNotification: true,
  },
};
export {
  confirmLeadEndpoint,
  confirmLeadEndpointWrongData,
  insertLeadDummyData,
  insertLeadAsConfirmedDummyData,
};
