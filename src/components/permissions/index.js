import { ExternalMicroserviceError } from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import { externalMsBaseUrls } from '~/src/config';

const baseUrl = externalMsBaseUrls.permissions;

/**
 * Set administrator profile on permissions service
 * @param {Object} userProfile
 * @param {String} token
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<Object>} Permissions service response if request ends succesfully
 */
async function setUserProfile(userProfile, token) {
  const endpoint = '/set_user_profile';
  try {
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      body: {
        ...userProfile,
        profile: 'administrator',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });
    return response.data;
  } catch ({ response }) {
    throw new ExternalMicroserviceError();
  }
}

/**
 * Assing admin profile for company/branch
 * @param {Object} company request object to execute the petition
 * @param {String} company.companyNumber
 * @param {String} company.branchNumber
 * @param {String} company.userNumber
 * @param {String} company.token
 * @throws {ExternalMicroserviceError}
 * @returns {Promise<String>} User profile
 */
async function assingUserPermissionsProfiles({
  companyNumber,
  branchNumber,
  userNumber,
  token,
}) {
  // Set user profile for company
  const userProfile = {
    companyNumber: parseInt(companyNumber, 10),
    userNumber: parseInt(userNumber, 10),
  };
  const companyProfile = await setUserProfile(userProfile, token);
  // set user profile for branch
  await setUserProfile(
    {
      ...userProfile,
      branchNumber: parseInt(branchNumber, 10),
    },
    token,
  );
  return companyProfile.profile;
}

export { assingUserPermissionsProfiles, setUserProfile };
