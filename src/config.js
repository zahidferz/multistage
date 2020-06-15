require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  nodeEnv: process.env.NODE_ENV,
  sqlHost: process.env.SQL_HOST,
  sqlPass: process.env.SQL_PASS,
  sqlPort: process.env.SQL_PORT,
  sqlUser: process.env.SQL_USER,
  saltCost: process.env.SALT_COST,
  slackConfig: {
    webhookUrl: process.env.REGISTROS_SLACK_WEBHOOK_URL,
  },
  twilioConfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_ACCOUNT_TOKEN,
    smsNumber: process.env.TWILIO_SMS_NUMBER,
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,
  },
  externalMsBaseUrls: {
    users: process.env.GX_BOA_MS_USERS_BASE_URL,
    companies: process.env.GX_BOA_MS_COMPANIES_BASE_URL,
    auth: process.env.GX_BOA_AUTH_BASE_URL,
    permissions: process.env.GX_BOA_MS_PERMISSIONS_BASE_URL,
    subscriptions: process.env.GX_BOA_MS_SUBSCRIPTIONS_BASE_URL,
    errorsTranslator: process.env.GX_BOA_MS_ERRORS_TRANSLATOR_BASE_URL,
    clients: process.env.GX_BOA_MS_CLIENTS_BASE_URL,
    pendingActions: process.env.GX_BOA_MS_PENDING_ACTIONS_BASE_URL,
  },
  leads: {
    daysRecentUnconfirmedLeadsGet: process.env.DAYS_RECENT_UNCONFIRMED_LEADS,
    daysUnconfirmedLeadsDelete: process.env.DAYS_DELETE_UNCONFIRMED_LEADS,
  },
  authConfig: {
    appId: process.env.GX_BOA_AUTH_APP_ID,
    appSecret: process.env.GX_BOA_AUTH_APP_SECRET,
    clientId: process.env.GX_BOA_AUTH_CLIENT_ID,
  },
};
