async function mockSubscriptionSuccessReponse() {
  const successMockResponse = {
    data: {
      data: {
        urls: {
          url_whereregisters: null,
          url_whereitcomesfrom: null,
          url_wherearrives: null,
          url_elementwhereregisters: null,
        },
        trial_days: 30,
        subscription_start_date: '2020-06-09',
        subscription_number: '2020064348206096',
        subscription_current_status_id: 1,
        subscription_current_status: 'trial',
        subscription_created_ip: '0.0.0.0',
        subscription_created_from: 'account-provisioning.gestionix.com',
        subscription_created_date: '2020-06-09T17:32:57.718',
        subscription_created_by: 'account-provisioning.gestionix.com',
        seller_id: 1,
        registry_completed_date: '2020-06-09',
        registry_completed: true,
        registry: {
          registry_business_size_employees: null,
          registry_business_size_clients: null,
          registry_business_size_branches: null,
          registry_business_size_accountants: null,
          registry_business_size: null,
          registry_business_segment: null,
          registry_business_sales_type_saleorders: null,
          registry_business_sales_type_quotes: null,
          registry_business_sales_type_multiprices: null,
          registry_business_sales_type_electronic_invoice: null,
          registry_business_sales_type_ecommerce: null,
          registry_business_sales_type_direct_sales: null,
          registry_business_sales_type_B2B: null,
          registry_business_profile_industry_group: null,
          registry_business_profile_industry: null,
          registry_business_profile_economic_sector: null,
          registry_business_profile_business_sector: null,
          registry_business_profile_activity_described: null,
          registry_business_profile_activity: null,
          registry_business_previous_software: null,
          registry_business_formality: null,
          registry_business_biggest_problem: null,
          registry_businees_size_sales: null,
        },
        period: [
          {
            subscription_number: '2020064348206096',
            plan_sku: 'GX-NEG-TP',
            period_users: 1,
            period_total_amount: 0.0,
            period_status: 'Trial',
            period_start_date: '2020-06-09',
            period_end_date: '2020-07-08',
            period_cashiers: 0,
            is_active: true,
            id: 24696,
            advance_payment: 0.0,
          },
        ],
        payment_method: null,
        initial_plan: {
          user_price: 299.0,
          plan_sku: 'GX-NEG-TP',
          plan_name: 'Totalplay - Administrador Total',
          periodicity: 'M',
          is_free: false,
          is_deleted: false,
          included_integrations: null,
          included_cashiers: 0,
          id: 129,
          cashier_price: 299.0,
          base_price: 149.06,
          base_plan_id: 14,
        },
        external_id: null,
        current_plan: {
          user_price: 299.0,
          plan_sku: 'GX-NEG-TP',
          plan_name: 'Totalplay - Administrador Total',
          periodicity: 'M',
          is_free: false,
          is_deleted: false,
          included_integrations: null,
          included_cashiers: 0,
          id: 129,
          cashier_price: 299.0,
          base_price: 149.06,
          base_plan_id: 14,
        },
        contact_role: 'Owner',
        contact_phone: '+526142858208',
        contact_name: 'Roberto Garcia',
        contact_email: 'test@test.com',
        company_tax_id: 'TEST9103055UX',
        company_name: 'Test Acc Provisioning',
        company_id: '206096',
        company_commercial_name: 'Test Acc Provisioning S. de R.L de C.V',
        attribution: {
          utm_term: null,
          utm_source: null,
          utm_medium: null,
          utm_matchtype: null,
          utm_content: null,
          utm_campaign: null,
        },
        additional: {
          ref_pipedrive_person_url: null,
          ref_pipedrive_organization_url: null,
          ref_pipedrive_deal_url: null,
          ref_intercom_user_url: null,
          ref_intercom_company_url: null,
          ref_backoffice_user_url: null,
          ref_backoffice_company_url: null,
          ref_activecampaign_url: null,
          initial_pipedrive_stage: null,
          gx_account_type: null,
        },
      },
    },
  };

  return new Promise((resolve) => {
    resolve(successMockResponse);
  });
}

async function mockSubscriptionErrorReponseInvalidSkuPlan() {
  const mockResponse = {
    response: {
      data: 'Invalid SKU Plan',
    },
  };
  return new Promise((resolve, reject) => {
    reject(mockResponse);
  });
}

export {
  mockSubscriptionSuccessReponse,
  mockSubscriptionErrorReponseInvalidSkuPlan,
};
