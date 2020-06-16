IF EXISTS (SELECT *
FROM [dbo].[Seller])
BEGIN
  DELETE FROM [dbo].[SellerPlan] WHERE SellerId = 1 AND Sku = 'GX-NEG-TP'
END