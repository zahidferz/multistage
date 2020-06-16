IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetSellerById')
BEGIN
  DROP PROCEDURE [dbo].[GetSellerById]
END

/****** Object:  StoredProcedure [dbo].[GetSellerById]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetSellerById] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Get a seller by id
-- Example: EXEC [dbo].[GetSellerById]
-- =============================================
CREATE PROCEDURE [dbo].[GetSellerById](
  @sellerId as int
)
AS
BEGIN
  SELECT sellerId,
    subscriptionToken
  FROM [dbo].[Seller] WITH(NOLOCK)
  WHERE SellerId = @sellerId
END
GO