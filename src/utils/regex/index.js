const mobilePhoneRegex = /(^[0-9]+)$/;
const countryCallingCodeRegex = /^\+\d+$/;
const forbiddenConsecutiveMobilePhoneRegex = /(01234)|(12345)|(23456)|(34567)|(45678)|(56789)|(67890)/;
const forbiddenRepeatedMobilePhoneRegex = /([0]{5,})|([1]{5,})|([2]{5,})|([2]{5,})|([3]{5,})|([4]{5,})|([5]{5,})|([6]{5,})|([7]{5,})|([8]{5,})|([9]{5,})/;
const spanishLettersRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/;
// at least 1 uppercase, 1 lowercase, 1 digit number, special digits optionally
// Length validated by joi in schema
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()\\-]+$/;

export {
  mobilePhoneRegex,
  countryCallingCodeRegex,
  spanishLettersRegex,
  passwordRegex,
  forbiddenConsecutiveMobilePhoneRegex,
  forbiddenRepeatedMobilePhoneRegex,
};
