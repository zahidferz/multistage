import '@babel/polyfill';
import { errorsCatalog } from 'gx-node-api-errors';
import request from 'supertest';
import app from '~/src/app';

import * as externalRequest from '~/src/components/utils/externalRequest';
import catalog from '~/src/errors/catalog';
import mockUpdateCompany from './mockData';
import {
  mockAuthorizationError,
  mockIntrospectTokenResponse,
} from '~/src/tests/integration/components/auth/mockFunctions';
import {
  mockNonExistentCompanyResponse,
  mockExistentCompanyResponse,
} from '~/src/tests/integration/components/companies/mockFunctions';
import mockDummyResponsePromiseAll from './mockFunctions';
import {
  mockSubscriptionErrorReponseInvalidSkuPlan,
  mockSubscriptionSuccessReponse,
} from '~/src/tests/integration/components/subscriptions/mockFunctions';
import {
  mockUnexpectedError,
  mockNonExistentUserRequest,
  mockNonExistentUserCompanyLinkRequest,
  mockExistentUserCompanyLink,
  mockResponseUpdateLeadStatus,
  mockGetUserByEmailWithResult,
} from '~/src/tests/integration/components/users/mockFunctions';

beforeAll(() => {
  errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
});

describe('Update company - /api/v1/companies', () => {
  afterAll(async () => {
    // https://github.com/visionmedia/supertest/issues/520
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });
  test('throws an authorization error when Auth header is not present', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .send(mockUpdateCompany);
    expect(status).toEqual(400);
    expect(body).toStrictEqual({
      errors: [
        {
          errorCode: 14,
          errorMessage: 'Authorization missing for service',
          errorType: 'error',
          field: 'authorization',
          fieldValue: null,
        },
      ],
      message: 'Bad Request Error',
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(0);
    mockExternalResponse.mockReset();
  });

  test('throws an authorization error when Auth service throws an 401 http status response', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockAuthorizationError);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);
    expect(status).toEqual(401);
    expect(body).toStrictEqual({
      message: 'Unauthorized',
      errors: [],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(1);
    mockExternalResponse.mockReset();
  });

  test('throws an External microservice error when the getUserByEmail function gets an unexpected error', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockUnexpectedError);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);
    expect(status).toEqual(500);
    expect(body).toStrictEqual({
      message: 'The application has encountered an unknown error',
      errors: [],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(2);
    mockExternalResponse.mockReset();
  });

  test('throws an Unprocessable Entity error getUserCompanyLink function does not found the provided user from the token', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockNonExistentUserRequest);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);
    expect(status).toEqual(422);
    expect(body).toStrictEqual({
      message: 'Unprocessable entity error',
      errors: [
        {
          field: 'userNumber',
          fieldValue: '10215',
          errorCode: 12,
          errorType: 'error',
          errorMessage: 'User does not exist',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(3);
    mockExternalResponse.mockReset();
  });

  test('throws an Unprocessable Entity error getUserCompanyLink function does not the link betwen company and user number', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockNonExistentUserCompanyLinkRequest);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);
    expect(status).toEqual(422);
    expect(body).toStrictEqual({
      message: 'Unprocessable entity error',
      errors: [
        {
          field: 'companyNumber',
          fieldValue: '22',
          errorCode: 13,
          errorType: 'error',
          errorMessage: 'Company not linked to user',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(3);
    mockExternalResponse.mockReset();
  });

  test('throws an Unprocessable Entity error getCompanyByNumber doest not found the company', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockExistentUserCompanyLink)
      .mockImplementationOnce(mockNonExistentCompanyResponse);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);
    expect(status).toEqual(422);
    expect(body).toStrictEqual({
      message: 'Unprocessable entity error',
      errors: [
        {
          field: 'companyNumber',
          fieldValue: '33',
          errorCode: 16,
          errorType: 'error',
          errorMessage: 'Company does not exist',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(4);
    mockExternalResponse.mockReset();
  });

  test('throws an Unprocessable Entity when the subscription can not be created on invalid sku plan', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockExistentUserCompanyLink)
      .mockImplementationOnce(mockExistentCompanyResponse)
      .mockImplementationOnce(mockSubscriptionErrorReponseInvalidSkuPlan);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);

    expect(status).toEqual(422);
    expect(body).toStrictEqual({
      message: 'Unprocessable entity error',
      errors: [
        {
          field: 'sku',
          fieldValue: 'GX-NEG-TP',
          errorCode: 25,
          errorType: 'error',
          errorMessage: 'Subscription has an invalid sku plan for the seller',
        },
      ],
      microservice: 'gx-boa-ms-account-provisioning',
    });

    expect(mockExternalResponse).toHaveBeenCalledTimes(5);
    mockExternalResponse.mockReset();
  });

  test('throws an External microservice error on update lead status', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockExistentUserCompanyLink)
      .mockImplementationOnce(mockExistentCompanyResponse)
      .mockImplementationOnce(mockSubscriptionSuccessReponse)
      /*
        Concurrent calls to createClient, updateSubCriptionNumber
        createInitialPending actions mocked to a resolve,
        because cant mock and guarantee order of execution
      */
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockUnexpectedError)
      /*
        Mocked to a simple resolve on delete user company
        and delete userCompanyLink
      */
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockDummyResponsePromiseAll);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);

    expect(status).toEqual(500);
    expect(body).toStrictEqual({
      errors: [],
      message: 'The application has encountered an unknown error',
      microservice: 'gx-boa-ms-account-provisioning',
    });

    /*
      Additional calls to external request execute
      to deleteCompany and deleteUserCompanyLInk on
      updateLeadStatus Error
    */
    expect(mockExternalResponse).toHaveBeenCalledTimes(11);
    mockExternalResponse.mockReset();
  });

  test('returns a succesful response when the company updated succesfully', async () => {
    const mockExternalResponse = jest
      .spyOn(externalRequest, 'execute')
      .mockImplementationOnce(mockIntrospectTokenResponse)
      .mockImplementationOnce(mockGetUserByEmailWithResult)
      .mockImplementationOnce(mockExistentUserCompanyLink)
      .mockImplementationOnce(mockExistentCompanyResponse)
      .mockImplementationOnce(mockSubscriptionSuccessReponse)
      /*
        Concurrent calls to createClient, updateSubCriptionNumber
        createInitialPending actions mocked to a resolve,
        because cant mock and guarantee order of execution
      */
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockDummyResponsePromiseAll)
      .mockImplementationOnce(mockResponseUpdateLeadStatus);

    const { status, body } = await request(app)
      .patch('/api/v1/companies')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ajsdfhaksdhjfTESTFAKETOKEN')
      .send(mockUpdateCompany);

    expect(status).toEqual(200);
    expect(body).toStrictEqual({});

    expect(mockExternalResponse).toHaveBeenCalledTimes(9);
    mockExternalResponse.mockReset();
  });
});
