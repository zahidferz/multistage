import { ValidationErrorForJoi } from 'gx-node-api-errors';

/**
 * Validate a schema since the request
 * @param {Object} data data to be validated
 * @param {Object} schema schema to use as reference to the validation
 * @returns {Promise<Boolean>} Returns true if the validation is successfully
 * and ValidationErrorForJoi if there are some errors
 */
export default async function validateSchemaForRoutes(
  data,
  schema,
  context = null,
) {
  await schema
    .validateAsync(data, {
      abortEarly: false,
      context,
    })
    .catch((error) => {
      throw new ValidationErrorForJoi('Invalid info for process', error);
    });

  return true;
}
