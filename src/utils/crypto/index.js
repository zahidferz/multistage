import bcrypt from 'bcrypt';
import { saltCost } from '~/src/config';

const saltRounds = parseInt(saltCost, 10);

/**
 * Convert password to an encoded version using bcrypt and 10 salt rounds
 * @export
 * @param {String} password Password to be encoded
 * @returns {String} The encoded password
 */
export default function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}
