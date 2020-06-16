async function createDbConnection(sqlManager) {
  const connection = await sqlManager.getConnection();

  return connection;
}

async function getDbTransaction(sqlManager, dbConnection) {
  const tran = await sqlManager.getTransaction(dbConnection);
  return tran;
}

async function excuteSp(sqlManager, sp, args = null) {
  const connection = await createDbConnection(sqlManager);
  const spResult = args ? await sp(connection, args) : await sp(connection);

  return spResult;
}

export { createDbConnection, getDbTransaction, excuteSp };
