import { DbError } from 'gx-node-api-errors';

/**
 * Search a seller by the given seller id
 * @param {Object} connection mssql connection
 * @param {Number} sellerId number to search
 */
export default async function getSellerByIdSp(connection, sellerId) {
  try {
    const result = await connection
      .request()
      .input('sellerId', sellerId)
      .execute('GetSellerById');

    return result.recordset[0];
  } catch (error) {
    throw new DbError(error);
  }
}
