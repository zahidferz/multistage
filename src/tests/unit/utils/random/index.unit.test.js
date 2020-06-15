import generateRandomCode from '~/src/components/utils/random';

describe('generateRandomCode', () => {
  test('returns 4 digit number', async () => {
    const code = await generateRandomCode();
    expect(code.toString()).toHaveLength(4);
  });
});
