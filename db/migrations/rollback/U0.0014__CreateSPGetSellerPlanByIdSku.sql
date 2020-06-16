IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetSellerPlanByIdSku')
BEGIN
  DROP PROCEDURE [dbo].[GetSellerPlanByIdSku]
END
