// @ts-nocheck
import '@babel/polyfill';

import { SqlManager } from '~/src/middlewares/database/SqlManager';

jest.setTimeout(50000);

const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function getDBName(connection) {
  const result = await connection.request().query('select db_name()');
  const obj = result.recordset;
  return obj;
}

async function getDBFlywayLastMigration(connection) {
  const result = await connection
    .request()
    .query(
      'SELECT TOP (1)'
        + ' [version], [description], [type], script, success'
        + ' FROM [dbo].[flyway_schema_history]'
        + ' ORDER BY installed_rank DESC',
    );
  const obj = result.recordset[0];
  return obj;
}

async function getLastMigrationFile() {
  const folder = path.join(process.cwd(), 'src/db/migrations/versioned');
  const files = fs.readdirSync(folder);
  const maped = files.map((file) => {
    const firstSplit = file.split('.');
    const secondSplit = firstSplit[1].split('__');
    return {
      version: `${firstSplit[0].replace('V', '')}.${secondSplit[0]}`,
      description: secondSplit[1],
      type: firstSplit[2].toUpperCase(),
      script: `versioned/${file}`,
    };
  });
  const sorted = maped.sort((a, b) => {
    if (parseFloat(a.version) > parseFloat(b.version)) {
      return 1;
    }
    if (parseFloat(a.version) < parseFloat(b.version)) {
      return -1;
    }
    return 0;
  });
  return sorted[sorted.length - 1];
}

describe('Integration Test: SQL SERVER connection', () => {
  it('Sql server connection is OK?', async () => {
    const sqlManager = new SqlManager();
    const connection = await sqlManager.getConnection();
    const result = await getDBName(connection);
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
  });

  it('Sql server migration run OK?', async () => {
    const sqlManager = new SqlManager();
    const connection = await sqlManager.getConnection();
    const dbData = await getDBFlywayLastMigration(connection);
    const fileData = await getLastMigrationFile();
    expect(dbData).not.toBeNull();
    expect(fileData).not.toBeNull();
    expect(dbData.success).toBe(true);
    expect(dbData.version).toBe(fileData.version);
    expect(dbData.description).toBe(fileData.description);
    expect(dbData.type).toBe(fileData.type);
    expect(dbData.script).toBe(fileData.script);
  });
});
