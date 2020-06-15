import { notifyUserRegistered } from '~/src/components/slack';

describe('slack module', () => {
  test('notifyUserRegistered', async () => {
    const user = {
      name: 'Cosme',
      lastName: 'Fulanito',
      email: 'some@email.com',
      phoneNumber: '5544332211',
      countryCode: '+52',
    };

    await expect(notifyUserRegistered(user)).resolves.toEqual(true);
  });
});
