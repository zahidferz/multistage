import '@babel/polyfill';
import request from 'supertest';
import app from '~/src/app';

describe('logInLeadController', () => {
  const endpoint = '/api/v1/log_in';
  test('With invalid body, returns 400', async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        countryCallingCode: '0000',
        mobilePhone: '5527258173',
        password: 'Gestionix15',
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      microservice: 'gx-boa-ms-account-provisioning',
      errors: [
        {
          field: 'countryCallingCode',
          fieldValue: '0000',
          errorCode: 3,
          errorType: 'error',
          errorMessage: 'countryCallingCode no coincide con el patrón esperado',
        },
      ],
      language: 'es_mx',
      message: 'countryCallingCode no coincide con el patrón esperado',
    });
  });

  test('When there is no an account with the specified mobile number, returns 422', async () => {
    const response = await request(app)
      .post(endpoint)
      .send({
        mobilePhone: '3333333333',
        countryCallingCode: '+52',
        password: 'Gestionix15',
      });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      microservice: 'gx-boa-ms-account-provisioning',
      errors: [
        {
          field: 'mobilePhone',
          fieldValue: '+523333333333',
          errorCode: 29,
          errorType: 'error',
          errorMessage: 'Only valid users can make signing processes',
        },
      ],
      language: 'es_mx',
      message: 'Only valid users can make signing processes',
    });
  });
});
