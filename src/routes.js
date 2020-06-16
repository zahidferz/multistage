import express from 'express';

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
router.get('/', (_req, res) => res.status(200).send({ project: 'gx-boa-ms-account-provisioning' }));
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

export default router;
