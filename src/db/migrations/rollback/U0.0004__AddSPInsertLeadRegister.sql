IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertLeadRegister')
BEGIN
  DROP PROCEDURE [dbo].[InsertLeadRegister]
END