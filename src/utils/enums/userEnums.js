const userErrorsEnum = {
  UserNotExist: 10,
  CompanyNotLinkedToUser: 11,
  BranchNotLinkedToUser: 12,
  EmailAlreadyExist: 13,
  UserIsAlreadyMemberOfCompany: 14,
  UserIsAlreadyMemberOfBranch: 15,
  UserIsAlreadySecured: 16,
  ConfirmationCodeAlreadyExist: 17,
  MobilePhoneAlreadyExist: 18,
  CantRegisterPhoneWithoutCode: 19,
  InvalidRole: 22,
  InvalidLeadStatus: 23,
};

const userStatusNum = {
  active: 1,
  suspended: 2,
  deleted: 3,
};
export { userErrorsEnum, userStatusNum };
