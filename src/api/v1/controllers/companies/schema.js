import Joi from '@hapi/joi';

function companySchema() {
  return Joi.object().keys({
    company: Joi.object().keys({
      taxId: Joi.string().required(),
      legalName: Joi.string().required(),
      commercialName: Joi.string(),
      companyDataLocalized: Joi.object().keys({
        regimenFiscalNombre: Joi.string(),
        regimenFiscalCodigo: Joi.string(),
      }),
      fiscalAddress: Joi.object().keys({
        postalCode: Joi.string().max(5),
        countryCode: Joi.string().max(3),
      }),
    }),
    user: Joi.object().keys({
      jobTitle: Joi.string(),
    }),
  });
}

function updateCompanySchema() {
  return Joi.object().keys({
    company: Joi.object()
      .keys({
        companyNumber: Joi.string().required(),
      })
      .required(),
    seller: Joi.object()
      .keys({
        sellerId: Joi.string().required(),
      })
      .required(),
    subscription: Joi.object()
      .keys({
        planSku: Joi.string().required(),
        registry: Joi.object()
          .keys({
            businessProfileActivity: Joi.string(),
            businessSizeEmployees: Joi.string(),
            businessBiggestProblem: Joi.string(),
          })
          .unknown(true),
        urls: Joi.object()
          .keys({})
          .unknown(true),
        attribution: Joi.object()
          .keys({})
          .unknown(true),
      })
      .unknown(true)
      .required(),
  });
}

export { companySchema, updateCompanySchema };
