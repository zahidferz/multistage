import '@babel/polyfill';

import { errorsCatalog, UnprocessableEntityError } from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';

import { excuteSp } from '~/src/components/utils/db';
import {
  dummyAddLead,
  dummyRemoveLead,
} from '~/src/tests/integration/components/lead/helpers';

import { getLeadByEmailSp } from '~/src/components/lead/datastores';
import { SqlManager } from '~/src/middlewares/database/SqlManager';
import { validateEmailExistance } from '~/src/components/lead';

jest.setTimeout(10000);

describe('validateEmailExistance component', () => {
  let sqlManager;

  beforeAll(async () => {
    errorsCatalog.set(catalog);
    await dummyAddLead();
    sqlManager = new SqlManager();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '9999999999',
      countryCallingCode: '+1',
    });
  });
  test('succes when getting a nonexistent lead by email', async () => {
    const emailExistance = await validateEmailExistance(sqlManager, {
      email: 'accountTest@gmail.com',
    });

    expect(emailExistance).toEqual(true);
  });

  test('throws error when getting a existent lead by mobile phone', async () => {
    await expect(
      validateEmailExistance(sqlManager, {
        email: 'test+001@gmail.com',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable Entity Error',
        'email',
        'test+001@gmail.com',
        'EmailAlreadyRegistered',
      ),
    );
  });
});

describe('getLeadByEmailSp datastore', () => {
  let sqlManager;

  beforeAll(async () => {
    errorsCatalog.set(catalog);
    await dummyAddLead();
    sqlManager = new SqlManager();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '9999999999',
      countryCallingCode: '+1',
    });
  });
  test('success when getting a nonexistent lead by email', async () => {
    const existentEmailOnSignUp = await excuteSp(sqlManager, getLeadByEmailSp, {
      email: 'test+002@gmail.com',
    });
    expect(existentEmailOnSignUp).toBeUndefined();
  });

  test('Throwns object when getting a nonexistent lead by email', async () => {
    const existentEmailOnSignUp = await excuteSp(sqlManager, getLeadByEmailSp, {
      email: 'test+001@gmail.com',
    });

    expect(existentEmailOnSignUp.email).toBe('test+001@gmail.com');
  });
});
