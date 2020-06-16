import bcrypt from 'bcrypt';
import encryptPassword from '~/src/utils/crypto';

describe('encryptPassword function ', () => {
  test('Return encoded password for a plane given', async () => {
    const myPassword = 'SecurePassword';
    const encodePassword = await encryptPassword(myPassword);
    const validatePassword = bcrypt.compareSync(myPassword, encodePassword);
    expect(validatePassword).toBe(true);
  });
  test('Return the correct encoded password', async () => {
    const myPassword = 'SecurePassword';
    const falsePassword = 'FalsePassword';
    const encodePassword = await encryptPassword(myPassword);
    const validateCorrectPassword = bcrypt.compareSync(
      myPassword,
      encodePassword,
    );
    const validateWrongPassword = bcrypt.compareSync(
      falsePassword,
      encodePassword,
    );

    expect(validateCorrectPassword).toBe(true);
    expect(validateWrongPassword).toBe(false);
  });
});
