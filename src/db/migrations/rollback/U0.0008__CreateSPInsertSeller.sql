IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertSeller')
BEGIN
  DROP PROCEDURE [dbo].[InsertSeller]
END