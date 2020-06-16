IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetRecentUnconfirmedLeads')
BEGIN
  DROP PROCEDURE [dbo].[GetRecentUnconfirmedLeads]
END