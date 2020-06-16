import { DbError } from 'gx-node-api-errors';

/**
 * Search a seller plan by the given seller id
 * and sku
 * @param {Object} connection mssql connection
 * @param {Object} object
 * @param {Number} object.sellerId seller id
 * @param {String} object.sku sku of the plan
 */
export default async function getSellerPlanByIdSkuSp(
  connection,
  { sellerId, sku },
) {
  try {
    const result = await connection
      .request()
      .input('sellerId', sellerId)
      .input('sku', sku)
      .execute('GetSellerPlanByIdSku');

    return result.recordset[0];
  } catch (error) {
    throw new DbError(error);
  }
}
