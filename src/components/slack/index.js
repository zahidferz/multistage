import sendSlackMessage from './utils';
import { slackConfig } from '../../config';

/**
 * Builds an object with user info to attach.
 *
 * @access private
 * @param {object} userData
 * @param {string} userData.name
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.mobilePhone
 * @param {string} userData.countryCallingCode
 */
function buildUserAttachment({
  name,
  lastName,
  email,
  mobilePhone,
  countryCallingCode,
}) {
  return {
    author_name: 'Chain bot',
    title: 'Información del usuario',
    text: `Nombre: ${name} ${lastName}\nemail: ${email}\nTeléfono: ${countryCallingCode} ${mobilePhone}`,
  };
}

/**
 * Send a message to slack with users info.
 * Use only for users who have confirmed their account.
 *
 * @param {Array} users contains user information
 *
 * @return {Promise} always true after every message.
 */
async function notifyUsersNotConfirmed(users) {
  const attachments = users.map((user) => buildUserAttachment(user));
  const payload = {
    username: 'Chain',
    icon_emoji: ':warning:',
    text: 'Usuarios sin confirmar cuenta',
    attachments,
  };

  await sendSlackMessage(payload, slackConfig.webhookUrl);

  return true;
}

/**
 * Send a message to slack with user information.
 * Use only after a user complete pre register.
 * @param {object} userData contains user information
 * @param {string} userData.name
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.phoneNumber
 * @param {string} userData.countryCode
 *
 * @return {Promise} always true after every message.
 */
async function notifyUserRegistered(userData) {
  const attachment = buildUserAttachment(userData);
  const payload = {
    username: 'Chain',
    icon_emoji: ':white_check_mark:',
    text: 'Nuevo usuario registrado',
    attachments: [attachment],
  };

  await sendSlackMessage(payload, slackConfig.webhookUrl);
  return true;
}

/**
 * Send a message to slack with user information.
 * Use only after a user confirms his account.
 * @param {object} userData contains user information
 * @param {string} userData.name
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.phoneNumber
 * @param {string} userData.countryCode
 *
 * @return {Promise} always true after every message.
 */
async function notifyUserConfirmedAccount(userData) {
  const attachment = buildUserAttachment(userData);
  const payload = {
    username: 'Chain',
    icon_emoji: ':white_check_mark:',
    text: 'Nuevo usuario confirmado',
    attachments: [attachment],
  };

  await sendSlackMessage(payload, slackConfig.webhookUrl);
  return true;
}

export {
  notifyUserConfirmedAccount,
  notifyUsersNotConfirmed,
  notifyUserRegistered,
};
