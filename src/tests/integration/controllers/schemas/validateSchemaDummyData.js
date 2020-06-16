const validateSignUpSchema = {
  body: {
    mobilePhone: '5527258180',
    countryCallingCode: '+52',
    name: 'Yocelin',
    lastName: 'Garcia',
    email: 'gr.yocelin+acc5@gmail.com',
    password: 'Panquecitos1',
  },
  params: {},
  query: {},
};
const validateSignUpSchemaMissingField = {
  body: {
    mobilePhone: '5527258180',
    name: 'Yocelin',
    lastName: 'Garcia',
    email: 'gr.yocelin+acc5@gmail.com',
    password: 'Panquecitos1',
  },
  params: {},
  query: {},
};
const validateSignUpSchemaDuplicated = {
  body: {
    mobilePhone: '9999999999',
    countryCallingCode: '+1',
    name: 'Yocelin',
    lastName: 'Garcia',
    email: 'test+001@gmail.com',
    password: 'Panquecitos1',
  },
  params: {},
  query: {},
};

export {
  validateSignUpSchema,
  validateSignUpSchemaMissingField,
  validateSignUpSchemaDuplicated,
};
