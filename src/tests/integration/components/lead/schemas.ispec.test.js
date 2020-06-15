import { ValidationErrorForJoi } from 'gx-node-api-errors';
import validateSchemaForRoutes from '~/src/components/utils/schema';
import { confirmAccountSchemaEnpoint } from '~/src/api/v1/controllers/lead/schemas';
import {
  confirmLeadEndpoint,
  confirmLeadEndpointWrongData,
} from '~/src/tests/integration/components/lead/dummyData';

describe('confirmAccountSchemaEnpoint function', () => {
  test('Can not confirm an inexistent lead', async () => {
    const isValidSchema = await validateSchemaForRoutes(
      confirmLeadEndpoint,
      confirmAccountSchemaEnpoint(),
    );
    expect(isValidSchema).toBe(true);
  });
  test('Can not confirm if are errors on data', async () => {
    await validateSchemaForRoutes(
      confirmLeadEndpointWrongData,
      confirmAccountSchemaEnpoint(),
    ).catch((error) => {
      expect(error).toBeInstanceOf(ValidationErrorForJoi);
      const err = error.toJson();
      expect(err.errors).toHaveLength(1);
      expect(err.errors[0].field).toBe('countryCallingCode');
      expect(err.errors[0].errorMessage).toBe(
        '{countryCallingCode} fails to match the required pattern',
      );
    });
  });
});
