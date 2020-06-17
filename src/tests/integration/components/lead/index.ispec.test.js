import {
  DbError,
  errorsCatalog,
  UnprocessableEntityError,
  NotFoundError,
} from 'gx-node-api-errors';
import catalog from '~/src/errors/catalog';
import { leads } from '~/src/config';
import SqlManager from '~/src/tests/SqlManagerTest';
import {
  insertLeadDummyData,
  insertLeadAsConfirmedDummyData,
} from '~/src/tests/integration/components/lead/dummyData';
import {
  dummyRemoveLead,
  dummyLeadSetToXDaySignUpAge,
} from '~/src/tests/integration/components/lead/helpers';
import {
  confirmLead,
  deleteOldUncofirmedLeads,
  generateConfirmationCode,
  getLeadByMobilePhone,
  getRecentUnconfirmedLeads,
  insertLead,
  validateLeadForConfirmation,
} from '~/src/components/lead';

let sqlManager;
beforeAll(() => {
  errorsCatalog.set(catalog);
  sqlManager = new SqlManager();
});

describe('generateConfirmationCode', () => {
  test('returns confirmation code', async () => {
    const confirmationCode = await generateConfirmationCode(sqlManager);

    expect(confirmationCode).toBeGreaterThanOrEqual(1000);
  });
});

describe('insertLead', () => {
  const leadToTest = {
    mobilePhone: '5555555555',
    countryCallingCode: '+52',
  };
  afterEach(async () => {
    await dummyRemoveLead(leadToTest);
  });
  test('When does not exist email or phone number, save register sucessfully', async () => {
    const newLead = await insertLead(sqlManager, insertLeadDummyData);
    expect(newLead.email).toBe('insertRegister@gmail.com');
  });
  test('When exist email or phone number, save register throwns on error', async () => {
    await insertLead(sqlManager, insertLeadDummyData);
    await expect(
      insertLead(sqlManager, insertLeadDummyData),
    ).rejects.toThrowError(
      new DbError(
        "Cannot insert duplicate key row in object 'dbo.Lead' with unique index 'SignUpConfirmationCode'. The duplicate key value is (0000).",
      ),
    );
  });
});

describe('getLeadByMobilePhone', () => {
  const leadToTest = {
    mobilePhone: '5555555555',
    countryCallingCode: '+52',
  };

  afterEach(async () => {
    await dummyRemoveLead(leadToTest);
  });

  test('with non existant lead, returns null', async () => {
    const lead = await getLeadByMobilePhone(sqlManager, '+11', '7788998877');

    expect(lead).toBeNull();
  });

  test('returns lead', async () => {
    const newLead = await insertLead(sqlManager, insertLeadDummyData);
    const lead = await getLeadByMobilePhone(
      sqlManager,
      newLead.countryCallingCode,
      newLead.mobilePhone,
    );

    expect(newLead).toEqual(lead);
  });
});

describe('confirmLead function', () => {
  const leadToTest = {
    mobilePhone: '5555555555',
    countryCallingCode: '+52',
  };
  afterEach(async () => {
    await dummyRemoveLead(leadToTest);
  });
  test('When an account has not been confirmed, confirmLead function confirm and release confirmationCode', async () => {
    const userInformation = await insertLead(sqlManager, insertLeadDummyData);
    const userConfirmated = await confirmLead(sqlManager, userInformation);

    expect(userConfirmated.confirmed).toBe(true);
    expect(userConfirmated.confirmationCode).toBe(null);
  });
  test('When an account has not confirmed, throwns error', async () => {
    const userInformation = await insertLead(
      sqlManager,
      insertLeadAsConfirmedDummyData,
    );

    await expect(confirmLead(sqlManager, userInformation)).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '+525555555555',
        'AccountAlreadyConfirmed',
      ),
    );
  });
});

describe('deleteOldUncofirmedLeads function', () => {
  const unconfirmedDays = leads.daysUnconfirmedLeadsDelete;
  test(`deletes 0 records that are ${unconfirmedDays} days or older`, async () => {
    await insertLead(sqlManager, insertLeadDummyData);
    const deletedLeads = await deleteOldUncofirmedLeads(sqlManager);
    expect(deletedLeads).toHaveLength(0);
  });
  test(`deletes 1 record that is ${unconfirmedDays} days or older`, async () => {
    await dummyLeadSetToXDaySignUpAge({
      mobilePhone: '5555555555',
      countryCallingCode: '+52',
      daysSinceSignUp: 7,
    });
    const deletedLeads = await deleteOldUncofirmedLeads(sqlManager);
    expect(deletedLeads).toHaveLength(1);
  });
});

describe('getRecentUncofirmedLeads function', () => {
  const unconfirmedDays = leads.daysRecentUnconfirmedLeadsGet;
  afterAll(async () => {
    await dummyRemoveLead(insertLeadDummyData);
  });
  test(`get 0 records that are ${unconfirmedDays} days old`, async () => {
    await insertLead(sqlManager, insertLeadDummyData);
    const recentUnconfirmedLeads = await getRecentUnconfirmedLeads(sqlManager);
    expect(recentUnconfirmedLeads).toHaveLength(0);
  });
  test(`get 1 record that is ${unconfirmedDays} days old`, async () => {
    await dummyLeadSetToXDaySignUpAge({
      mobilePhone: '5555555555',
      countryCallingCode: '+52',
      daysSinceSignUp: unconfirmedDays,
    });

    const recentUnconfirmedLeads = await getRecentUnconfirmedLeads(sqlManager);
    expect(recentUnconfirmedLeads).toHaveLength(1);
  });
});

describe('validateLeadForConfirmation', () => {
  const inexistentLead = {
    mobilePhone: '5555555555',
    countryCallingCode: '+52',
  };
  afterEach(async () => {
    await dummyRemoveLead(inexistentLead);
  });
  test('Can not confirm an inexistent lead', async () => {
    await expect(
      validateLeadForConfirmation(sqlManager, inexistentLead),
    ).rejects.toThrowError(
      new NotFoundError(
        'Not found error',
        'mobilePhone',
        '+525555555555',
        'InexistentLead',
      ),
    );
  });
  test('Can not confirm a confirmed lead', async () => {
    const confirmedLead = await insertLead(sqlManager, {
      ...insertLeadDummyData,
      confirmed: true,
    });
    await expect(
      validateLeadForConfirmation(sqlManager, confirmedLead),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobilePhone',
        '+525555555555',
        'AccountAlreadyConfirmed',
      ),
    );
  });
  test('Can not confirm a lead with invalid confirmationCode', async () => {
    const lead = await insertLead(sqlManager, insertLeadDummyData);
    lead.confirmationCode = '9999';
    await expect(
      validateLeadForConfirmation(sqlManager, lead),
    ).rejects.toThrowError(
      new UnprocessableEntityError(
        'Unprocessable entity error',
        'mobiconfirmationCodelePhone',
        '9999',
        'InvalidConfirmationCode',
      ),
    );
  });
  test('Returns leaad if can be confirmed', async () => {
    const validLead = await insertLead(sqlManager, insertLeadDummyData);
    const leadToValidate = await validateLeadForConfirmation(
      sqlManager,
      validLead,
    );
    expect(leadToValidate.mobilePhone).toBe(validLead.mobilePhone);
  });
});
