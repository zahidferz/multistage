/* eslint-disable jest/no-disabled-tests */
import request from 'supertest';
import app from '~/src/app';
import {
  dummyRemoveLead,
  dummyAddLead,
} from '~/src/tests/integration/components/lead/helpers';
import {
  validateSignUpSchema,
  validateSignUpSchemaDuplicated,
} from '~/src/tests/integration/controllers/schemas/validateSchemaDummyData';

describe('Sign Up Controller', () => {
  beforeAll(async () => {
    await dummyAddLead();
  });
  afterAll(async () => {
    await dummyRemoveLead({
      mobilePhone: '5527258180',
      countryCallingCode: '+52',
    });
    await dummyRemoveLead({
      mobilePhone: '9999999999',
      countryCallingCode: '+1',
    });
  });
  test.skip('With valid request a sale is created', async () => {
    const endpoint = '/api/v1/leads?sendConfirmationCode=false&sendSlackNotification=false';
    const response = await request(app)
      .post(endpoint)
      .send(validateSignUpSchema.body);
    expect(response.status).toBe(201);
  });
  test.skip('With no body, can not create a new register', async () => {
    const endpoint = '/api/v1/leads?sendConfirmationCode=false&sendSlackNotification=false';
    const response = await request(app).post(endpoint);
    expect(response.status).toBe(400);
  });
  test.skip('With and existed register,can not create a new one', async () => {
    const endpoint = '/api/v1/leads?sendConfirmationCode=false&sendSlackNotification=false';
    const response = await request(app)
      .post(endpoint)
      .send(validateSignUpSchemaDuplicated.body);
    expect(response.status).toBe(422);
  });
});
