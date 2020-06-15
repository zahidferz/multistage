import convertFalsyOrTruthyToBoolean from '~/src/components/utils/parsers';

describe('convertFalsyOrTruthyToBoolean  function ', () => {
  test('Return true when no value is given', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean();
    expect(convertedToBoolean).toBe(true);
  });
  test('Return true when value is equal to 1', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean(1);
    expect(convertedToBoolean).toBe(true);
  });
  test("Return true when value is equal to '1'", () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean('1');
    expect(convertedToBoolean).toBe(true);
  });
  test("Return true when value is equal to 'true'", () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean('true');
    expect(convertedToBoolean).toBe(true);
  });
  test('Return true when value is equal to true', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean(true);
    expect(convertedToBoolean).toBe(true);
  });
  test('Return true when value is equal to 0', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean(0);
    expect(convertedToBoolean).toBe(false);
  });
  test("Return true when value is equal to '0'", () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean('0');
    expect(convertedToBoolean).toBe(false);
  });
  test("Return true when value is equal to 'false'", () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean('false');
    expect(convertedToBoolean).toBe(false);
  });
  test('Return true when value is equal to false', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean(false);
    expect(convertedToBoolean).toBe(false);
  });
  test('Return true when value is equal to null', () => {
    const convertedToBoolean = convertFalsyOrTruthyToBoolean(null);
    expect(convertedToBoolean).toBe(false);
  });
});
