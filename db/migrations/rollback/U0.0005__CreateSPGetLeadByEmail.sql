IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetLeadByEmail')
BEGIN
  DROP PROCEDURE [dbo].[GetLeadByEmail]
END