import '@babel/polyfill';
import { errorsCatalog, UnprocessableEntityError } from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';
import { excuteSp } from '~/src/components/utils/db';
import {
  dummyAddLead,
  dummyRemoveLead,
} from '~/src/tests/integration/components/lead/helpers';

import { getLeadByMobilePhoneSp } from '~/src/components/lead/datastores';
import { SqlManager } from '~/src/middlewares/database/SqlManager';
import { validateMobilePhoneExistance } from '~/src/components/lead';

jest.setTimeout(50000);

describe('validateMobilePhoneExistance component', () => {
  let sqlManager;

  beforeAll(async () => {
    errorsCatalog.set(catalog);
    await dummyAddLead();
    sqlManager = new SqlManager();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '2345099991',
      countryCallingCode: '+1',
    });
  });

  test('succes when getting a nonexistent lead by mobile phone', async () => {
    const mobilePhoneExistance = await validateMobilePhoneExistance(
      sqlManager,
      {
        countryCallingCode: '+1',
        mobilePhone: '8888888888',
      },
    );

    expect(mobilePhoneExistance).toEqual(false);
  });

  test('throws error when getting a existent lead by mobile phone', async () => {
    await expect(
      validateMobilePhoneExistance(sqlManager, {
        countryCallingCode: '+1',
        mobilePhone: '2345099991',
      }),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '2345099991',
        'ExistentUser',
      ),
    );
  });
});

describe('getSignUpByMobilePhone datastore', () => {
  let sqlManager;

  beforeAll(async () => {
    errorsCatalog.set(catalog);
    await dummyAddLead();
    sqlManager = new SqlManager();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '2345099991',
      countryCallingCode: '+1',
    });
  });

  test('success when getting a nonexistent lead by mobile phone', async () => {
    const existentSignUp = await excuteSp(sqlManager, getLeadByMobilePhoneSp, {
      countryCallingCode: '+1',
      mobilePhone: '8888888888',
    });
    expect(existentSignUp).toBeUndefined();
  });
});
