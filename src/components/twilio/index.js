/* eslint-disable no-console */
import twilio from 'twilio';
import { twilioConfig } from '~/src/config';

/**
 * Builds the destination mobile phone number
 * if it belongs to +52 code it prepends a 1
 *in order to have a correct destination number
 * @param {Object} data
 * @param {String} data.countryCallingCode in format E.164 +52
 * @param {String} data.mobilePhone as a mobile phone between 10 and 12 digits in length
 * @returns
 */
function buildDestinationNumber({ countryCallingCode, mobilePhone }) {
  return countryCallingCode === '+52'
    ? `${countryCallingCode}1${mobilePhone}`
    : `${countryCallingCode}${mobilePhone}`;
}

/**
 * Send whatsapp message using twilio library
 *
 * @access private
 * @param {String} destinationNumber number to send whatsapp message.
 * @param {String} body whatsapp message content.
 * @param {Array} mediaUrl array with media urls.
 *
 * @return {Promise} always returns true.
 */
async function sendWhatsappMsg(destinationNumber, body, mediaUrl = []) {
  try {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

    await client.messages.create({
      from: `whatsapp:${twilioConfig.whatsappNumber}`,
      to: `whatsapp:${destinationNumber}`,
      body,
      mediaUrl,
    });

    return true;
  } catch (error) {
    console.log(error);
    // console.log(error.error_message);
    return true;
  }
}

/**
 * Send an sms using twilio library
 *
 * @access private
 * @param {String} destinationNumber number to send sms.
 * @param {String} body sms content.
 * @param {Array} mediaUrl array with media urls.
 *
 * @return {Promise} always returns true.
 */
async function sendSmsMsg(destinationNumber, body, mediaUrl = []) {
  try {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    await client.messages.create({
      from: `${twilioConfig.smsNumber}`,
      to: `${destinationNumber}`,
      body,
      mediaUrl,
    });

    return true;
  } catch (error) {
    console.log(error.error_code);
    console.log(error.error_message);
    return true;
  }
}

/**
 * Sends a message with the confirmation code
 * @param {Object} data
 * @param {String} data.countryCallingCode in format E.164 +52
 * @param {String} data.mobilePhone as a mobile phone between 10 and 12 digits in length
 * @param {Number} code confirmation code to send.
 * @param {String} via all messages by default are sended via whatsapp, the other via is sms.
 *
 * @return {Promise} always returns true.
 */
async function sendConfirmationCode(
  { countryCallingCode, mobilePhone },
  code,
  via = 'whatsapp',
) {
  // const message = `Tu código de verificación para Chain es: ${code}`;
  const message = `Your activation code is ${code}`;
  const destinationNumber = buildDestinationNumber({
    countryCallingCode,
    mobilePhone,
  });

  if (via === 'sms') {
    await sendSmsMsg(destinationNumber, message);
    return true;
  }

  await sendWhatsappMsg(destinationNumber, message);

  return true;
}

/**
 * Use this function after the user completes his signup
 * @param {Object} data
 * @param {String} data.countryCallingCode in format E.164 +52
 * @param {String} data.mobilePhone as a mobile phone between 10 and 12 digits in length
 * @param {String} via all messages by default are sended via whatsapp, the other via is sms
 *
 * @return {Promise} always returns true.
 */
async function sendNewUserWelcomeMessage(
  { countryCallingCode, mobilePhone },
  via = 'whatsapp',
) {
  // eslint-disable-next-line operator-linebreak
  // const message =
  // 'Nos encanta que formes parte de las miles empresas que ya están conectadas. Tu cuenta ha sido confirmada, entra y explora Chain:\nhttps://app.chain.inc/';
  const message = 'Your bienvenido code is https://app.chain.inc/';
  const destinationNumber = buildDestinationNumber({
    countryCallingCode,
    mobilePhone,
  });
  if (via === 'sms') {
    await sendSmsMsg(destinationNumber, message);
    return true;
  }

  await sendWhatsappMsg(destinationNumber, message);
  return true;
}

export { sendConfirmationCode, sendNewUserWelcomeMessage };
