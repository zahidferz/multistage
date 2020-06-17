import '@babel/polyfill';
import request from 'supertest';
import app from '~/src/app';
import {
  dummyAddLead,
  dummyRemoveLead,
} from '~/src/tests/integration/components/lead/helpers';

describe('Validate mobile phone controller - /users?countryCallingCode=:countryCallingCode&mobilePhone=:mobilePhone', () => {
  beforeAll(async () => {
    await dummyAddLead();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '2345099991',
      countryCallingCode: '+1',
    });
  });

  test('throws an error when a lead already has a mobile phone registered', async () => {
    const { status, body } = await request(app)
      .get('/api/v1/leads')
      .set({ 'Country-Calling-Code': '+1', 'Mobile-Phone': '2345099991' });
    expect(status).toEqual(422);
    expect(body).toStrictEqual({
      errors: [
        {
          errorCode: 10,
          errorMessage:
            'There is an existent user with the provided mobile phone',
          errorType: 'error',
          field: 'mobilePhone',
          fieldValue: '2345099991',
        },
      ],
      message: 'There is an existent user with the provided mobile phone',
      microservice: 'gx-boa-ms-account-provisioning',
      language: 'es_mx',
    });
  });

  test('pass when a lead mobile phone is not already registered', async () => {
    const { status, body } = await request(app)
      .get('/api/v1/leads')
      .set({ 'Country-Calling-Code': '+1', 'Mobile-Phone': '2345099998' });
    expect(status).toEqual(200);
    expect(body).toBe(false);
  });
});

describe('sendConfirmationCodeController', () => {
  const endpoint = '/api/v1/leads/send_confirmation_code';

  test('With invalid body, returns 422', async () => {
    const response = await request(app)
      .post(endpoint)
      .set('Accept', 'application/json')
      .send({});
    expect(response.status).toBe(400);
  });

  test('With invalid request info, returns 400', async () => {
    const response = await request(app)
      .post(endpoint)
      .set('Accept', 'application/json')
      .send({ countryCallingCode: '123+', mobilePhone: '4433221122' });
    expect(response.status).toBe(400);
  });
});

describe('getConfirmationCodeController', () => {
  const endpoint = '/api/v1/leads/confirmation_codes';

  beforeAll(async () => {
    await dummyAddLead();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '2345099991',
      countryCallingCode: '+1',
    });
  });

  test('Without the required headers, returns 400', async () => {
    const response = await request(app)
      .get(endpoint)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      errors: [
        {
          field: 'countryCallingCode',
          errorCode: 1,
          errorType: 'error',
          errorMessage: 'countryCallingCode es requerido',
        },
        {
          field: 'mobilePhone',
          errorCode: 1,
          errorType: 'error',
          errorMessage: 'mobilePhone es requerido',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
      language: 'es_mx',
      message: 'countryCallingCode es requerido',
    });
  });

  test('When there is no lead with the specified mobile number, returns 404', async () => {
    const response = await request(app)
      .get(endpoint)
      .set('Accept', 'application/json')
      .set({ 'Country-Calling-Code': '+1', 'Mobile-Phone': '2345099990' });
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      message: 'Lead does not exist',
      errors: [
        {
          field: null,
          fieldValue: null,
          errorCode: 22,
          errorType: 'error',
          errorMessage: 'Lead does not exist',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
      language: 'es_mx',
    });
  });

  test('When the lead exists, returns 200', async () => {
    const response = await request(app)
      .get(endpoint)
      .set('Accept', 'application/json')
      .set({ 'Country-Calling-Code': '+1', 'Mobile-Phone': '2345099991' });
    expect(response.status).toBe(200);
  });
});

describe('confirmLeadController', () => {
  const endpoint = '/api/v1/leads/confirm_account';

  beforeAll(async () => {
    await dummyAddLead();
  });

  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '2345099991',
      countryCallingCode: '+1',
    });
  });

  test('With invalid body, returns 400', async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        confirmationCode: '0001',
        agreedTermsAndConditions: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      language: 'es_mx',
      message: 'mobilePhone es requerido',
      errors: [
        {
          field: 'mobilePhone',
          errorCode: 1,
          errorType: 'error',
          errorMessage: 'mobilePhone es requerido',
        },
        {
          field: 'countryCallingCode',
          errorCode: 1,
          errorType: 'error',
          errorMessage: 'countryCallingCode es requerido',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });
  });

  test('When there is no lead with the specified mobile number, returns 404', async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        mobilePhone: '2345099990',
        countryCallingCode: '+52',
        confirmationCode: '0001',
        agreedTermsAndConditions: true,
      });

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      language: 'es_mx',
      message: 'Lead does not exist',
      errors: [
        {
          field: 'mobilePhone',
          fieldValue: '+522345099990',
          errorCode: 27,
          errorType: 'error',
          errorMessage: 'Lead does not exist',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });
  });

  test('When the lead exists, but does not have correct confirmation code, return 422 error', async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        mobilePhone: '2345099991',
        countryCallingCode: '+1',
        confirmationCode: '0001',
        agreedTermsAndConditions: true,
      });

    expect(response.status).toBe(422);
  });
});
