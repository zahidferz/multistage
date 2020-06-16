IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'DeleteOldUnconfirmedLeads')
BEGIN
  DROP PROCEDURE [dbo].[DeleteOldUnconfirmedLeads]
END