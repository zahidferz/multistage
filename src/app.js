import '@babel/polyfill';
import 'reflect-metadata';
// import appInsights from 'applicationinsights';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import expressPino from 'express-pino-logger';
import pino from 'pino';
import { errorsCatalog } from 'gx-node-api-errors';
import router from './routes';

import catalog from './errors/catalog';
import { logLevel } from './config';
import registerPeriodicTasks from './components/cron';
import { getSqlManager } from './middlewares/database/SqlManager';

errorsCatalog.set(catalog, 'gx-boa-ms-account-provisioning');
dotenv.config();
registerPeriodicTasks();

const logger = pino({ level: logLevel || 'info' });
const expressLogger = expressPino({ logger });

const Sentry = require('@sentry/node');

const app = express();

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.requestHandler());

app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());
app.use(getSqlManager);
app.use(expressLogger);
app.use(router);
app.use(Sentry.Handlers.errorHandler());

module.exports = app;
