IF NOT EXISTS (SELECT 1
FROM [dbo].[SellerPlan]
WHERE [SellerId] = 1
  AND [Sku] = 'GX-NEG-TP')
INSERT INTO [dbo].[SellerPlan]
  ([SellerId],[Sku], [TrialDays])
VALUES(1, 'GX-NEG-TP', 30)