import sql from 'mssql';

function exportDbConfig() {
  if (process.env.NODE_ENV === 'test') {
    return {
      user: process.env.SQL_USER_TEST,
      password: process.env.SQL_PASS_TEST,
      server: process.env.SQL_HOST_TEST,
      database: process.env.SQL_DATABASE_TEST,
    };
  }

  return {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    server: process.env.SQL_HOST,
    database: process.env.SQL_DATABASE,
  };
}

const dbConfig = exportDbConfig();
const config = {
  ...dbConfig,
  requestTimeout: 30000,
  options: {
    encrypt: true,
    enableArithAbort: true,
    connectTimeout: 30000,
    appName: 'gx-boa-ms-account-provisioning',
  },
  pool: {
    max: 1500,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export default class SqlManager {
  constructor() {
    this.Pool = new sql.ConnectionPool(config);
    this.connection = null;
  }

  async getConnection() {
    if (!this.connection) {
      this.connection = await this.Pool.connect();
    }
    return this.connection;
  }

  async getTransaction(connection) {
    let currentConnection = connection;
    if (!currentConnection) {
      currentConnection = await this.Pool.connect();
    }
    return currentConnection.transaction();
  }

  async getRequest() {
    return new sql.Request(this.Pool);
  }
}

export const getSqlManager = async (req, res, next) => {
  try {
    // Use app.locals instead global.
    if (!req.app.locals.SqlManager) {
      req.app.locals.SqlManager = new SqlManager();
    }
    next();
  } catch (error) {
    throw new Error(`getSqlManager: ${error}`);
  }
};
