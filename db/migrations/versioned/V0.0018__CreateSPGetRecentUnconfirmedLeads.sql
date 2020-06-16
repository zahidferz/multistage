IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetRecentUnconfirmedLeads')
BEGIN
  DROP PROCEDURE [dbo].[GetRecentUnconfirmedLeads]
END

/****** Object:  StoredProcedure [dbo].[GetRecentUnconfirmedLeads]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetRecentUnconfirmedLeads] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Get leads that have X days of age after signup
-- Example: EXEC [dbo].[GetRecentUnconfirmedLeads]
-- =============================================
CREATE PROCEDURE [dbo].[GetRecentUnconfirmedLeads](
  @unconfirmedDays as int
)
AS
BEGIN
  DECLARE @currentDate date;
  SET @currentDate = GETDATE();

  SELECT mobilePhone,
    countryCallingCode,
    name,
    lastName,
    email,
    signUpDate
  FROM Lead
  WHERE DATEDIFF(DAY, SignUpDate, @currentDate) = @unconfirmedDays
    AND Confirmed = 'false';
END
GO