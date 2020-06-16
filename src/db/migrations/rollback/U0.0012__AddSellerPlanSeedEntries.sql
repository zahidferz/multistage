IF EXISTS (SELECT *
FROM [dbo].[Seller])
BEGIN
  DELETE FROM [dbo].[SellerPlan] WHERE SellerId = 2 AND Sku = 'GX-NEG-TP'
END