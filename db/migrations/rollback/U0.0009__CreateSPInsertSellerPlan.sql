IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertSellerPlan')
BEGIN
  DROP PROCEDURE [dbo].[InsertSellerPlan]
END