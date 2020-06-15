import axios from 'axios';

/**
 * Send payload to the given url
 * @param {object} payload
 * @param {string} webhookUrl
 *
 * @return {Promise}
 */
export default async function sendSlackMessage(payload, webhookUrl) {
  try {
    await axios.post(webhookUrl, payload);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}
