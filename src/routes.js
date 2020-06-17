import express from 'express';

import logInController from '~/src/api/v1/controllers/auth';

import {
  createLeadController,
  confirmLeadController,
  getConfirmationCodeController,
  sendConfirmationCodeController,
  validateLeadMobilePhoneExistanceController,
} from '~/src/api/v1/controllers/lead';
import {
  createCompanyController,
  updateCompanyController,
} from '~/src/api/v1/controllers/companies';

const router = express.Router();

// prettier-ignore
router.get('/', (req, res) => res.send({
  name: process.env.NAMET || 'gx-boa-ms-account-provisioning',
  version: process.env.VERSIONT || 'not defined',
  commit: process.env.COMMITT || 'not defined',
  date: process.env.DATET || 'not defined',
}));
router.get('/api/v1/leads', validateLeadMobilePhoneExistanceController);
router.get('/api/v1/leads/confirmation_codes', getConfirmationCodeController);
router.post('/api/v1/leads', createLeadController);
router.post(
  '/api/v1/leads/send_confirmation_code',
  sendConfirmationCodeController,
);
router.post('/api/v1/companies', createCompanyController);
router.patch('/api/v1/companies', updateCompanyController);
router.post('/api/v1/leads/confirm_account', confirmLeadController);
router.post('/api/v1/log_in', logInController);

export default router;
