import getSellerPlanByIdSkuSp from '~/src/components/sellerPlan/datastores';
import { excuteSp } from '~/src/components/utils/db';

export default async function getSellerPlan(sqlManager, sellerId, sku) {
  const sellerPlan = await excuteSp(sqlManager, getSellerPlanByIdSkuSp, {
    sellerId,
    sku,
  });

  return sellerPlan || null;
}
