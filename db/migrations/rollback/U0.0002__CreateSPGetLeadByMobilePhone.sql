IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetLeadByMobilePhone')
BEGIN
  DROP PROCEDURE [dbo].[GetLeadByMobilePhone]
END