IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertSeller')
BEGIN
  DROP PROCEDURE [dbo].[InsertSeller]
END


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Luis Maldonado
-- Description: Insert Seller
-- Example: EXEC [dbo].[InsertSeller] 'asdf658a6e/465'
-- =============================================
CREATE PROCEDURE [dbo].[InsertSeller]
  (
  @subscriptionToken varchar(255)
)
AS
BEGIN
  DECLARE @sellerId int;

  INSERT INTO [dbo].[Seller]
    (SubscriptionToken)
  VALUES(@subscriptionToken);

  SET @sellerId = @@Identity;

  SELECT @sellerId as sellerId,
    @subscriptionToken as subscriptionToken
END
GO