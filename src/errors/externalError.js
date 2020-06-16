import { UnprocessableEntityError } from 'gx-node-api-errors';

export default function throwAllowedUnprocessableEntityError(
  field,
  fieldValue,
  ErrorName,
) {
  throw new UnprocessableEntityError(
    'Unprocessable entity error',
    field,
    fieldValue,
    ErrorName,
  );
}
