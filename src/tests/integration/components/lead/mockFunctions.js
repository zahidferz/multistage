import { UnprocessableEntityError } from 'gx-node-api-errors';

function leadExistsMock(sqlmanager, { countryCallingCode, mobilePhone }) {
  const fakeExistingLeadMobilePhone = {
    countryCallingCode: '+52',
    mobilePhone: '1234567890',
  };

  return new Promise((resolve) => resolve(
    !!(
      countryCallingCode === fakeExistingLeadMobilePhone.countryCallingCode
        && mobilePhone === fakeExistingLeadMobilePhone.mobilePhone
    ),
  ));
}

function userExistsMock({ countryCallingCode, mobilePhone }) {
  const fakeExistingUserMobilePhone = {
    countryCallingCode: '+52',
    mobilePhone: '1234567899',
  };

  return new Promise((resolve, reject) => {
    const userExistsCallMock = !!(
      countryCallingCode === fakeExistingUserMobilePhone.countryCallingCode
      && mobilePhone === fakeExistingUserMobilePhone.mobilePhone
    );
    if (userExistsCallMock) {
      reject(
        new UnprocessableEntityError(
          'Unprocessable entity error',
          'mobilePhone',
          '1234567899',
          'ExistentUser',
        ),
      );
    }
    resolve({ data: false });
  });
}

function leadConfirmMock(sqlmanager, { confirmed }) {
  const fakeConfirmedLead = {
    countryCallingCode: '+52',
    mobilePhone: '27258173',
    confirmed: true,
    name: 'Cosme',
    lastName: 'Fulanito',
    email: 'some@email.com',
    confirmationCode: '0000',
    password:
      '0x70616E7175656369746F7300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    signUpDate: '2020-06-08T05:00:00.000Z',
    subscriptionInfo: '',
  };

  return new Promise((resolve, reject) => {
    const userExistsCallMock = !!(confirmed === fakeConfirmedLead.confirmed);
    if (userExistsCallMock) {
      reject(
        new UnprocessableEntityError(
          'Unprocessable entity error',
          'mobilePhone',
          '+5227258173',
          'AccountAlreadyConfirmed',
        ),
      );
    }
    resolve(fakeConfirmedLead);
  });
}

export { leadExistsMock, userExistsMock, leadConfirmMock };
