import { msErrorCodes } from '~/src/components/utils/externalRequest';

const companiesErrorEnums = {
  ...msErrorCodes,
  InexistentCompany: 10,
  AlreadyExistentTaxId: 11,
};

export default companiesErrorEnums;
