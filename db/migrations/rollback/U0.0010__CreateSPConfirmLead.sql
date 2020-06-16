IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'ConfirmLead')
BEGIN
  DROP PROCEDURE [dbo].[ConfirmLead]
END