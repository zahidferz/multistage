import getErrorTranslate from '~/src/middlewares/errorsTranslator';

export default async function returnErrorDependingOnStatusCodeExistence(
  error,
  res,
  next,
) {
  const errorTranslate = await getErrorTranslate(error.toJson());

  if (!errorTranslate.message) {
    errorTranslate.message = errorTranslate.errors && errorTranslate.errors.length
      ? errorTranslate.errors[0].errorMessage
      : '';
  }
  return error.statusCode
    ? res.status(error.statusCode).send(errorTranslate)
    : next(error);
}
