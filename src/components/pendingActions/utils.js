import moment from 'moment-timezone';

const PendingActionTypeEnum = {
  COMPANY_USERS_JOIN_REQUEST_APPROVAL: 1,
  SPENDING_SENT_PAYMENTS_APPROVAL: 2,
  INCOME_SALE_INVOICES_CANCEL_APPROVAL: 3,
  INCOME_SALES_SHOPIFY_ORDERS_APPROVAL: 4,
  INCOME_CLIENTS_ACTION: 5,
  INCOME_SALES_QUOTES_ACTION: 6,
  INCOME_SALE_ORDERS_ACTION: 7,
  INCOME_RECEIVED_PAYMENTS_ACTION: 8,
  SPENDING_PURCHASES_ACTION: 9,
  MONEY_ACCOUNTS_ACTION: 10,
  COMPANIES_ACTION: 11,
  SPENDING_EXPENSES_ACTION: 12,
  WELCOME: 13,
  COMPANY_UPLOAD_INVOICING_CERTIFICATES: 14,
  COMPANY_UPLOAD_LOGO: 17,
};

const PendingActionResourceTypeEnum = {
  INCOME_CLIENTS: 1,
  INCOME_SALE_QUOTES: 2,
  INCOME_SALE_ORDERS: 3,
  INCOME_SALES: 4,
  INCOME_RECEIVED_PAYMENTS: 5,
  SPENDING_SUPPLIERS: 6,
  SPENDING_EXPENSES: 7,
  SPENDING_PURCHASES: 8,
  SPENDING_PAYROLL: 9,
  SPENDING_SENT_PAYMENTS: 10,
  MONEY_ACCOUNTS: 11,
  USERS: 12,
  COMPANY_USERS: 13,
  INCOME_SALE_INVOICES: 14,
  COMPANIES: 15,
  INVENTORY: 16,
  APPLICATION: 17,
};

/**
 * Build the array of initial pending actions
 * needed when a user and company are
 * sucessfully created
 * @export
 * @param {Object} company
 * @param {String} company.companyId
 * @param {Number} company.companyNumber
 * @param {String} company.commercialName
 * @param {Object} user
 * @param {String} user.userId
 * @param {Number} user.userNumber
 * @param {String} user.userCompleteName
 * @returns
 */
export default function buildInitialPendingActions(
  { companyNumber, companyId, commercialName },
  { userId, userNumber, userCompleteName },
) {
  const creationDatetime = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  return [
    {
      companyNumber,
      pendingTypeId: PendingActionTypeEnum.WELCOME,
      actions: [],
      users: [userNumber],
      actionableResourceTypeId: PendingActionResourceTypeEnum.APPLICATION,
      title: 'Te damos la bienvenida',
      description: 'Tu negocio donde quieras con {Chain}.',
      descriptionReferences: [],
      createdBy: userNumber,
      creationDatetime,
    },
    {
      companyNumber,
      pendingTypeId:
        PendingActionTypeEnum.COMPANY_UPLOAD_INVOICING_CERTIFICATES,
      actions: [],
      users: [userNumber],
      actionableResourceTypeId: PendingActionResourceTypeEnum.INCOME_SALES,
      title: 'Emite tu primera factura',
      description: 'Sube fácil tus certificados e inicia.',
      descriptionReferences: [],
      createdBy: userNumber,
      creationDatetime,
    },
    {
      companyNumber,
      pendingTypeId: PendingActionTypeEnum.COMPANY_UPLOAD_LOGO,
      actions: ['Ir a subir logo'],
      users: [userNumber],
      actionableResourceTypeId: PendingActionResourceTypeEnum.COMPANY_USERS,
      title: 'Sube tu logo',
      description: 'Dale presencia a tu empresa, personaliza Chain',
      descriptionReferences: [
        {
          resourceTypeId: 13,
          resourceId: companyId,
          resourceReference: commercialName,
          resourceDescription: null,
          index: 1,
        },
        {
          resourceTypeId: 12,
          resourceId: userId,
          resourceReference: userCompleteName,
          resourceDescription: null,
          index: 2,
        },
      ],
      createdBy: userNumber,
      creationDatetime,
    },
  ];
}
