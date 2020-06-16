import logInSchemaEnpoint from '~/src/api/v1/controllers/auth/schema';
import returnErrorDependingOnStatusCodeExistence from '~/src/utils/routesFunctionHelper';
import validateSchemaForRoutes from '~/src/components/utils/schema';

import { logIn } from '~/src/components/auth';
import { validateUserInfoForLogIn } from '~/src/components/users';

/**
 * Log In an account
 * @param {Object} req request object to execute the petition
 * @param {Object} res response object to manage the petition
 * @param {Object} next next object to manage the petition
 * @returns {Promise<Object>} Returns the new user can log in
 */
export default async function logInController(req, res, next) {
  try {
    await validateSchemaForRoutes(req, logInSchemaEnpoint());
    const user = await validateUserInfoForLogIn(req.body);

    const signInRes = await logIn(user, req.body);

    return res.status(201).send(signInRes);
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}
