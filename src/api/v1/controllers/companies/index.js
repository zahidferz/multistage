import { companySchema, updateCompanySchema } from './schema';
import getUserCredentials from '~/src/middlewares/security';
import returnErrorDependingOnStatusCodeExistence from '~/src/utils/routesFunctionHelper';
import validateSchemaForRoutes from '~/src/components/utils/schema';
import { assingUserPermissionsProfiles } from '~/src/components/permissions';
import {
  insertCompany,
  getCompanyByNumber,
  updateSubscriptionNumber,
} from '~/src/components/companies';
import createClient from '~/src/components/clients';
import buildGeneralPublicClient from '~/src/components/clients/utils';
import { createSubscription } from '~/src/components/subscriptions';
import createBulkPendingActions from '~/src/components/pendingActions';
import buildInitialPendingActions from '~/src/components/pendingActions/utils';
import {
  insertUserCompanyLink,
  getUserByEmail,
  getUserCompanyLink,
  udpateLeadStatus,
} from '~/src/components/users';

/**
 * Create new company request
 * @param {Object} req request object to execute the petition
 * @param {Object} res response object to manage the petition
 * @param {Object} next next object to manage the petition
 * @returns {Promise<Object>} Returns the new company register is ends successfully,
 *  or error if is an invalid request
 */
async function createCompanyController(req, res, next) {
  try {
    const { body } = req;
    await validateSchemaForRoutes(body, companySchema());
    const user = await getUserCredentials(req.headers.authorization);
    const company = await insertCompany(body.company);
    await insertUserCompanyLink(company, user.userNumber);
    const profile = await assingUserPermissionsProfiles({
      userNumber: user.userNumber,
      companyNumber: company.companyNumber,
      branchNumber: company.branch.branchNumber,
      token: user.token,
    });
    await udpateLeadStatus(
      user.userNumber,
      company.companyNumber,
      'pendingCompanySubscription',
    );
    return res.send({
      userNumber: user.userNumber,
      company,
      profile,
    });
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

/**
 * Updates a company subscription number, creates
 * a general public client and sets the
 * initial pending actions for the given user
 * associated in token
 * @param {Object} req - from express
 * @param {Object} res - from express
 * @param {Object} next - from express
 * @returns {Promise<Object>} - returns the newly succesfully
  created subscription number for the company
 */
async function updateCompanyController(req, res, next) {
  try {
    const { userNumber, email } = await getUserCredentials(
      req.headers.authorization,
    );
    const { body } = req;
    await validateSchemaForRoutes(body, updateCompanySchema());

    const sqlManager = req.app.locals.SqlManager;
    const { data: user } = await getUserByEmail({ email });
    const { companyNumber } = await getUserCompanyLink({
      userNumber,
      companyNumber: body.company.companyNumber,
    });

    const company = await getCompanyByNumber({ companyNumber });
    const { seller, subscription } = body;
    const { data } = await createSubscription(sqlManager, {
      seller,
      subscription,
      company,
      user,
    });

    await Promise.all([
      updateSubscriptionNumber(companyNumber, data.subscription_number),
      createClient(buildGeneralPublicClient(companyNumber)),
      createBulkPendingActions(buildInitialPendingActions(company, user)),
    ]);
    await udpateLeadStatus(userNumber, companyNumber, 'completed');
    return res.send();
  } catch (error) {
    return returnErrorDependingOnStatusCodeExistence(error, res, next);
  }
}

export { createCompanyController, updateCompanyController };
