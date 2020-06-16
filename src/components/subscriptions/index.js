import moment from 'moment-timezone';

import {
  ExternalMicroserviceError,
  UnprocessableEntityError,
} from 'gx-node-api-errors';
import * as externalRequest from '~/src/components/utils/externalRequest';
import { externalMsBaseUrls } from '~/src/config';
import getSeller from '~/src/components/seller';
import getSellerPlan from '~/src/components/sellerPlan';

const baseUrl = externalMsBaseUrls.subscriptions;
const defaultTimeZone = 'America/Mexico_City';
const createdDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

/**
 * Build the subscription registry
 * node for the given subscription
 * @param {*} subscription
 * @returns
 */
function getSubscriptionRegistry(subscription) {
  // prettier-ignore
  return !subscription.registry
    ? {}
    : {
      registry_business_profile_economic_sector:
          subscription.registry.businessProfileEconomicSector,
      registry_business_profile_business_sector:
          subscription.registry.businessProfileBusinessSector,
      registry_business_profile_industry_group:
          subscription.registry.businessProfileIndustryGroup,
      registry_business_profile_industry:
          subscription.registry.businessProfileIndustry,
      registry_business_profile_activity:
          subscription.registry.businessProfileActivity,
      registry_business_profile_activity_described:
          subscription.registry.businessProfileActivityDescribed,
      registry_business_formality: subscription.registry.businessFormality,
      registry_business_segment: subscription.registry.businessSegment,
      registry_business_sales_type_direct_sales:
          subscription.registry.businessSalesTypeDirectSales,
      registry_business_sales_type_electronic_invoice:
          subscription.registry.businessSalesTypeElectronicInvoice,
      registry_business_sales_type_B2B:
          subscription.registry.businessSalesTypeB2B,
      registry_business_sales_type_multiprices:
          subscription.registry.businessSalesTypeMultiprices,
      registry_business_sales_type_quotes:
          subscription.registry.businessSalesTypeQuotes,
      registry_business_sales_type_saleorders:
          subscription.registry.businessSalesTypeSaleorders,
      registry_business_sales_type_ecommerce:
          subscription.registry.businessSalesTypeEcommerce,
      registry_business_size: subscription.registry.businessSize,
      registry_business_size_employees:
          subscription.registry.businessSizeEmployees,
      registry_business_size_accountants:
          subscription.registry.businessSizeAccountants,
      registry_business_size_clients:
          subscription.registry.businessSizeClients,
      registry_businees_size_sales: subscription.registry.busineesSizeSales,
      registry_business_size_branches:
          subscription.registry.businessSizeBranches,
      registry_business_biggest_problem:
          subscription.registry.businessBiggestProblem,
      registry_business_previous_software:
          subscription.registry.businessPreviousSoftware,
    };
}

/**
 * Build the subscription attributions
 * node for the given subscription
 * @param {*} subscription
 * @returns
 */
function getSubscriptionAttribution(subscription) {
  // prettier-ignore
  return !subscription.attribution
    ? {}
    : {
      utm_source: subscription.attribution.utmSource,
      utm_medium: subscription.attribution.utmMedium,
      utm_campaign: subscription.attribution.utmCampaign,
      utm_content: subscription.attribution.utmContent,
      utm_term: subscription.attribution.utmTerm,
      utm_matchtype: subscription.attribution.utmMatchtype,
    };
}

/**
 * Build the subscription urls
 * node for the given subscription
 * @param {*} subscription
 * @returns
 */
function getSubscriptionUrls(subscription) {
  // prettier-ignore
  return !subscription.urls
    ? {}
    : {
      url_whereitcomesfrom: subscription.urls.whereItComesFrom,
      url_wherearrives: subscription.urls.whereArrives,
      url_whereregisters: subscription.urls.whereRegisters,
      url_elementwhereregisters: subscription.urls.elementWhereRegisters,
    };
}

/**
 * Generates a subscription number for
 * the newly created company
 * @param {Object} company.companyNumber
 * @returns
 */
function generateChainSubscriptionNumber({ companyNumber }) {
  const yearMonth = moment()
    .tz(defaultTimeZone)
    .format('YYYYMM');
  // Chain initials identifier in ascii value
  const CH_ASCII = '4348';

  return `${yearMonth}${CH_ASCII}${companyNumber}`;
}

/**
 * Gets the subscription status based on the
 * trial days for the seller plan
 * @param {*} trialDays
 * @returns
 */
function getSubscriptionStatus(trialDays) {
  return trialDays === 0 ? 'activa' : 'trial';
}

/**
 * Builds the subscription object
 *
 * @param {Object} data
 * @param {Object} data.subscription
 * @param {Object} data.user {email, mobilePhone, userCompleteName }
 * @param {Object} data.company {companyNumber, taxId, legalName, commercialName}
 * @param {Object} seller
 * @param {Number} seller.sellerId
 * @param {Object} sellerPlan
 * @param {String} sellerPlan.sku
 * @param {String} sellerPlan.trialDays
 * @returns
 */
function buildCreateSubscriptionObject(data, seller, sellerPlan) {
  const { subscription, user, company } = data;

  const subscriptionRegistry = getSubscriptionRegistry(subscription);
  const subscriptionAttribution = getSubscriptionAttribution(subscription);
  const subscriptionUrls = getSubscriptionUrls(subscription);

  const subscriptionNumber = !subscription.subscriptionNumber
    ? generateChainSubscriptionNumber(company)
    : subscription.subscriptionNumber;

  const startDate = moment()
    .tz(defaultTimeZone)
    .format('YYYY-MM-DD');

  const subscriptionStatus = getSubscriptionStatus(sellerPlan.trialDays);

  return {
    subscription: {
      subscription_number: subscriptionNumber,
      status: subscriptionStatus,
      company_id: String(company.companyNumber),
      company_tax_id: company.taxId,
      company_name: company.legalName || 'N/A',
      company_commercial_name: company.commercialName,
      contact_name: user.userCompleteName,
      contact_role: 'Owner',
      contact_email: user.email,
      contact_phone: user.mobilePhone,
      plan_sku: sellerPlan.sku,
      trial_days: sellerPlan.trialDays,
      subscription_start_date: startDate,
      subscription_created_date: moment()
        .tz(defaultTimeZone)
        .format(createdDateTimeFormat),
      subscription_created_by: subscription.createdBy,
      subscription_created_ip: subscription.createdIp,
      subscription_created_from:
        subscription.createdFrom || 'account-provisioning.gestionix.com',
      registry_completed: true,
      registry_completed_date: startDate,
      registry: subscriptionRegistry,
      attribution: subscriptionAttribution,
      urls: subscriptionUrls,
      requested_by: `${seller.sellerId}`,
      executed_by:
        subscription.createdFrom || 'account-provisioning.gestionix.com',
    },
  };
}

/**
 * Creates a subscripton on the subscriptions service
 *
 * @param {*} sqlManager
 * @param {Object} data
 * @param {Object} data.seller
 * @param {Object} data.subscription
 * @param {Object} data.user
 * @param {Object} data.company
 * @throws {UnprocessableEntityError} - when the given sku
 * plan doest bellong to the given seller
 * @throws {ExternalMicroserviceError} - when the
 * subscription service give any other unexpected error
 * @returns {Promise}
 */
async function createSubscription(sqlManager, data) {
  const { sellerId } = data.seller;
  const { planSku } = data.subscription;
  const seller = await getSeller(sqlManager, sellerId);
  if (!seller) {
    throw new UnprocessableEntityError(
      'Unprocessable entity error',
      'sellerId',
      sellerId,
      'InexistentSeller',
    );
  }
  const sellerPlan = await getSellerPlan(sqlManager, sellerId, planSku);
  if (!sellerPlan) {
    throw new UnprocessableEntityError(
      'Unprocessable entity error',
      'sellerIdSku',
      null,
      'InexistentSellerPlan',
    );
  }
  const newSubscriptionObject = buildCreateSubscriptionObject(
    data,
    seller,
    sellerPlan,
  );

  try {
    const endpoint = '/subscriptions';
    const response = await externalRequest.execute({
      baseUrl,
      endpoint,
      method: 'POST',
      body: newSubscriptionObject,
      headers: {
        Authorization: `${seller.subscriptionToken}`,
      },
    });
    return response.data;
  } catch ({ response }) {
    if (response.data === 'Invalid SKU Plan') {
      throw new UnprocessableEntityError(
        'Unprocessable entity error',
        'sku',
        planSku,
        'InvalidSkuPlan',
      );
    }
    throw new ExternalMicroserviceError();
  }
}

export {
  createSubscription,
  buildCreateSubscriptionObject,
  generateChainSubscriptionNumber,
};
