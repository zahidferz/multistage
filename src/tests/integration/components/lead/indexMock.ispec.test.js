import { errorsCatalog, UnprocessableEntityError } from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';
import { leadExistsMock, userExistsMock } from './mockFunctions';

// Cant use babel-root syntax ~ import a module
const lead = jest.genMockFromModule('../../../../components/lead/index.js');

beforeAll(() => {
  errorsCatalog.set(catalog);
});

lead.generateConfirmationCode = jest.fn(
  () => new Promise((resolve) => resolve(1234)),
);

lead.validateMobilePhoneExistance = jest.fn(
  // prettier-ignore
  async (sqlmanager, data) => {
    const existentSignUp = await leadExistsMock(sqlmanager, data);


    if (!existentSignUp) {
      const { data: response } = await userExistsMock(data);
      return response;
    }

    throw new UnprocessableEntityError(
      'Unprocessable entity error',
      'mobilePhone',
      data.mobilePhone,
      'ExistentUser',
    );
  },
);

describe('lead test suite mock external calls', () => {
  test('generateConfirmationCode', async () => {
    expect(lead.generateConfirmationCode.mock).toBeTruthy();
    await expect(lead.generateConfirmationCode()).resolves.toEqual(1234);
  });

  test('fails when a lead mobile phone is already regirested in lead', async () => {
    expect(lead.validateMobilePhoneExistance.mock).toBeTruthy();
    await expect(
      lead.validateMobilePhoneExistance(null, {
        countryCallingCode: '+52',
        mobilePhone: '1234567890',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '1234567890',
        'ExistentUser',
      ),
    );
  });

  test('fails when a user mobile phone is already regirested in users', async () => {
    expect(lead.validateMobilePhoneExistance.mock).toBeTruthy();
    await expect(
      lead.validateMobilePhoneExistance(null, {
        countryCallingCode: '+52',
        mobilePhone: '1234567899',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '1234567899',
        'ExistentUser',
      ),
    );
  });

  test('pass when a lead mobile phone not registered in lead and users', async () => {
    expect(lead.validateMobilePhoneExistance.mock).toBeTruthy();
    await expect(
      lead.validateMobilePhoneExistance(null, {
        countryCallingCode: '+52',
        mobilePhone: '1234567822',
      }),
    ).resolves.toBe(false);
  });
});
