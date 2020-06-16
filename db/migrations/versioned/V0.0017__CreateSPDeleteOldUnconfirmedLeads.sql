IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'DeleteOldUnconfirmedLeads')
BEGIN
  DROP PROCEDURE [dbo].[GetSellerPlanDeleteOldUnconfirmedLeadsByIdSku]
END

/****** Object:  StoredProcedure [dbo].[DeleteOldUnconfirmedLeads]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[DeleteOldUnconfirmedLeads] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Deletes uncofirmed leads with X days of age
-- Example: EXEC [dbo].[DeleteOldUnconfirmedLeads]
-- =============================================
CREATE PROCEDURE [dbo].[DeleteOldUnconfirmedLeads](
  @requiredDaysToDeleteLead as int
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
  WHERE DATEDIFF(DAY, SignUpDate, @currentDate) >= @requiredDaysToDeleteLead
    AND Confirmed = 'false';

  DELETE L1
    FROM Lead L1
    INNER JOIN Lead L2
    ON L1.MobilePhone = L2.MobilePhone
      AND L1.CountryCallingCode = L2.CountryCallingCode
            WHERE DATEDIFF(DAY, L2.SignUpDate, @currentDate) >= @requiredDaysToDeleteLead
    AND L2.Confirmed = 'false';

END
GO