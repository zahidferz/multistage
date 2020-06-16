import validateSchemaForRoutes from '~/src/components/utils/schema';
import { insertSignupSchemaEnpoint } from '~/src/api/v1/controllers/lead/schemas';
import { validateSignUpSchema } from '~/src/tests/integration/controllers/schemas/validateSchemaDummyData';

describe('Test insertSignupSchemaEnpoint schema', () => {
  it('With correct data schema ends successfully', async () => {
    const signUpValidated = await validateSchemaForRoutes(
      validateSignUpSchema,
      insertSignupSchemaEnpoint(),
    );
    expect(signUpValidated).toBe(true);
  });
});
