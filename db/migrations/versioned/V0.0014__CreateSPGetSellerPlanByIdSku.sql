IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetSellerPlanByIdSku')
BEGIN
  DROP PROCEDURE [dbo].[GetSellerPlanByIdSku]
END

/****** Object:  StoredProcedure [dbo].[GetSellerPlanByIdSku]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetSellerPlanByIdSku] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Get a seller by id and sku
-- Example: EXEC [dbo].[GetSellerPlanByIdSku]
-- =============================================
CREATE PROCEDURE [dbo].[GetSellerPlanByIdSku](
  @sellerId as int,
  @sku as VARCHAR(255)
)
AS
BEGIN
  SELECT sellerId,
    sku,
    trialDays
  FROM [dbo].[SellerPlan] WITH(NOLOCK)
  WHERE SellerId = @sellerId
    AND Sku = @sku
END
GO