/**
 * Convert value to boolean
 * @param {Object} value
 * @param {Object} defaultValue to return if something happens with the function
 * @returns {Boolean} Returns the converted to boolean value
 */
export default function convertFalsyOrTruthyToBoolean(
  value = true,
  defaultValue = true,
) {
  try {
    switch (value) {
      case 'true':
      case 1:
      case '1':
        return true;
      case 'false':
      case 0:
      case '0':
      case null:
        return false;
      default:
        return Boolean(value);
    }
  } catch (error) {
    return defaultValue;
  }
}
