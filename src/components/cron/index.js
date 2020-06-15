import cron from 'node-cron';

import {
  deleteOldUncofirmedLeads,
  getRecentUnconfirmedLeads,
} from '~/src/components/lead';
import { notifyUsersNotConfirmed } from '~/src/components/slack';
import SqlManager from '~/src/tests/SqlManagerTest';

/**
 * Register the task in the node-cron module
 * of notifying unconfirmed users and
 * also delete unconfirmed users with an older
 * sigunp age
 * @export
 */
export default function registerPeriodicTasks() {
  cron.schedule('0 9 * * *', async () => {
    const sqlManager = new SqlManager();
    await deleteOldUncofirmedLeads(sqlManager);
  });

  cron.schedule('5 9 * * *', async () => {
    const sqlManager = new SqlManager();
    const unconfirmedUsers = await getRecentUnconfirmedLeads(sqlManager);
    await notifyUsersNotConfirmed(unconfirmedUsers);
  });
}
