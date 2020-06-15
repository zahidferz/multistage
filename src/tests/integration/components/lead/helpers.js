import { DbError } from 'gx-node-api-errors';
import moment from 'moment-timezone';

import { createDbConnection } from '~/src/components/utils/db';
import SqlManager from '~/src/tests/SqlManagerTest';
import generateRandomCode from '~/src/components/utils/random';

async function dummyRemoveLead({ mobilePhone, countryCallingCode }) {
  try {
    const sqlManager = new SqlManager();
    const connection = await createDbConnection(sqlManager);
    await connection.request().query`
    DELETE FROM [dbo].[Lead]
    WHERE MobilePhone = ${mobilePhone}
    AND CountryCallingCode = ${countryCallingCode}
    `;
  } catch (error) {
    throw new DbError(error);
  }
}

async function dummyAddLead() {
  try {
    const sqlManager = new SqlManager();
    const connection = await createDbConnection(sqlManager);
    const randomConfirmationCode = await generateRandomCode();
    const result = await connection.request().query(`
    SET NOCOUNT ON
    INSERT INTO [dbo].[Lead] VALUES(
      '9999999999',
      '+1',
      'Usuario',
      'Test',
      'test+001@gmail.com',
      '${randomConfirmationCode}'
      ,0,
      0,
      '2020-02-24T12:00:00.000',
      null);
    `);
    return result;
  } catch (error) {
    throw new DbError(error);
  }
}

async function dummyLeadSetToXDaySignUpAge({
  mobilePhone,
  countryCallingCode,
  daysSinceSignUp,
}) {
  try {
    const sqlManager = new SqlManager();
    const connection = await createDbConnection(sqlManager);
    const dateXDaysOld = moment()
      .subtract(daysSinceSignUp, 'days')
      .format('YYYY-MM-DDTHH:mm:ss.SSS');
    const result = await connection.request().query(`
    UPDATE Lead Set SignUpDate = '${dateXDaysOld}' 
      WHERE MobilePhone = '${mobilePhone}'
      AND CountryCallingCode ='${countryCallingCode}';
    `);
    return result;
  } catch (error) {
    throw new DbError(error);
  }
}

export { dummyRemoveLead, dummyAddLead, dummyLeadSetToXDaySignUpAge };
