import getSellerById from '~/src/components/seller/datastores';
import { excuteSp } from '~/src/components/utils/db';

/**
 * Get a seller by id
 *
 * @export
 * @param {*} sqlManager
 * @param {Number} sellerId
 * @throws {UnprocessableEntityError} - when seller is not found
 * @returns {Promise}
 */
export default async function getSeller(sqlManager, sellerId) {
  const seller = await excuteSp(sqlManager, getSellerById, sellerId);
  return seller || null;
}
