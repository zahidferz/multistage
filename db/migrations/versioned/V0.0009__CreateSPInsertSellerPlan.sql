IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertSellerPlan')
BEGIN
  DROP PROCEDURE [dbo].[InsertSellerPlan]
END


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Luis Maldonado
-- Description: Insert Seller
-- Example: EXEC [dbo].[InsertSellerPlan] 1, 'SKU-PRUEBA',15
-- =============================================
CREATE PROCEDURE [dbo].[InsertSellerPlan]
  (
  @sellerId int,
  @sku varchar(255),
  @trialDays SMALLINT
)
AS
BEGIN
  INSERT INTO [dbo].[SellerPlan]
    (SellerId, Sku, TrialDays)
  VALUES(@sellerId, @sku, @trialDays);


  SELECT @sellerId as sellerId,
    @sku as sku,
    @trialDays as trialDays
END
GO