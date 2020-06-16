IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetSellerById')
BEGIN
  DROP PROCEDURE [dbo].[GetSellerById]
END