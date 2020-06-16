/* eslint-disable no-console */
import twilio from 'twilio';
import { twilioConfig } from '~/src/config';

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
 * @param {String} destinationNumber phone number in format E.164 e.g. +525510928347.
 * @param {Number} code confirmation code to send.
 * @param {String} via all messages by default are sended via whatsapp, the other via is sms.
 *
 * @return {Promise} always returns true.
 */
async function sendConfirmationCode(destinationNumber, code, via = 'whatsapp') {
  // const message = `Tu código de verificación para Chain es: ${code}`;
  const message = `Your activation code is ${code}`;

  if (via === 'sms') {
    await sendSmsMsg(destinationNumber, message);
    return true;
  }

  await sendWhatsappMsg(destinationNumber, message);

  return true;
}

/**
 * Use this function after the user completes his signup
 * @param {String} destinationNumber phone number in format E.164 e.g. +525510928347
 * @param {String} via all messages by default are sended via whatsapp, the other via is sms
 *
 * @return {Promise} always returns true.
 */
async function sendNewUserWelcomeMessage(destinationNumber, via = 'whatsapp') {
  // eslint-disable-next-line operator-linebreak
  // const message =
  // 'Nos encanta que formes parte de las miles empresas que ya están conectadas. Tu cuenta ha sido confirmada, entra y explora Chain:\nhttps://app.chain.inc/';
  const message = 'Your bienvenido code is https://app.chain.inc/';

  if (via === 'sms') {
    await sendSmsMsg(destinationNumber, message);
    return true;
  }

  await sendWhatsappMsg(destinationNumber, message);
  return true;
}

export { sendConfirmationCode, sendNewUserWelcomeMessage };
