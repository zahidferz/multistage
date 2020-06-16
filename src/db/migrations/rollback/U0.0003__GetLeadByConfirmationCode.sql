IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetLeadByConfirmationCode')
BEGIN
  DROP PROCEDURE [dbo].[GetLeadByConfirmationCode]
END