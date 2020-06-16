import randomNumber from 'random-number-csprng';

/**
 * Generates a random number between 1000 and 9999
 *
 * @return {Promise} returns a promise that contain an integer
 */
export default async function generateRandomCode() {
  const number = await randomNumber(1000, 9999);

  return number;
}
