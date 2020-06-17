IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'DeleteLeadByMobilePhone')
BEGIN
  DROP PROCEDURE [dbo].[DeleteLeadByMobilePhone]
END
