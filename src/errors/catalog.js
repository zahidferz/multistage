export default {
  ExistentUser: {
    errorCode: 10,
    errorType: 'error',
    errorMessage: 'There is an existent user with the provided mobile phone',
  },
  EmailAlreadyRegistered: {
    errorCode: 11,
    errorType: 'error',
    errorMessage: 'A user already exist with the given email',
  },
  InexistentUser: {
    errorCode: 12,
    errorType: 'error',
    errorMessage: 'User does not exist',
  },
  CompanyNotLinkedToUser: {
    errorCode: 13,
    errorType: 'error',
    errorMessage: 'Company not linked to user',
  },
  AuthorizationIsMissing: {
    errorCode: 14,
    errorType: 'error',
    errorMessage: 'Authorization missing for service',
  },
  TaxIdAlreadyExist: {
    errorCode: 15,
    errorType: 'error',
    errorMessage:
      'There is already a registered company with the provided taxId',
  },
  InexistentCompany: {
    errorCode: 16,
    errorType: 'error',
    errorMessage: 'Company does not exist',
  },
  CantRegisterPhoneWithoutCode: {
    errorCode: 17,
    errorType: 'error',
    errorMessage: 'Can not register a mobilePhone without a countryCallingCode',
  },
  ConfirmationCodeAlreadyRegistered: {
    errorCode: 18,
    errorType: 'error',
    errorMessage: 'The specified confirmationCode already exist',
  },
  InvalidRole: {
    errorCode: 19,
    errorType: 'error',
    errorMessage: 'Invalid role value',
  },
  InvalidLeadStatus: {
    errorCode: 20,
    errorType: 'error',
    errorMessage: 'Invalid lead status',
  },
  AccountAlreadyConfirmed: {
    errorCode: 21,
    errorType: 'error',
    errorMessage: 'An account with the provided phone has been confirmed yet',
  },
  NonExistantLead: {
    errorCode: 22,
    errorType: 'error',
    errorMessage: 'Lead does not exist',
  },
  InexistentSeller: {
    errorCode: 23,
    errorType: 'error',
    errorMessage: 'Seller does not exist',
  },
  InexistentSellerPlan: {
    errorCode: 24,
    errorType: 'error',
    errorMessage: 'Seller plan does not exist',
  },
  InvalidSkuPlan: {
    errorCode: 25,
    errorType: 'error',
    errorMessage: 'Subscription has an invalid sku plan for the seller',
  },
  PasswordStrengthError: {
    errorCode: 26,
    errorType: 'error',
    errorMessage: 'PasswordStrengthError: Password is too weak',
  },
  InexistentLead: {
    errorCode: 27,
    errorType: 'error',
    errorMessage: 'Lead does not exist',
  },
  InvalidConfirmationCode: {
    errorCode: 28,
    errorType: 'error',
    errorMessage:
      'The specified confirmationCode is invalid for he provided lead',
  },
  InvalidUserStatus: {
    errorCode: 29,
    errorType: 'error',
    errorMessage: 'Only valid users can make signing processes',
  },
  SignInError: {
    errorCode: 30,
    errorType: 'error',
    errorMessage: 'Wrong email or password',
  },
};
