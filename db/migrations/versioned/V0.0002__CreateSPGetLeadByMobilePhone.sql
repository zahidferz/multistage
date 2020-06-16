IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetLeadByMobilePhone')
BEGIN
  DROP PROCEDURE [dbo].[GetLeadByMobilePhone]
END

/****** Object:  StoredProcedure [dbo].[GetLeadByMobilePhone]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetLeadByMobilePhone] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Get data from lead by country calling code + mobile phone
-- Example: EXEC [dbo].[GetLeadByMobilePhone]
-- =============================================
CREATE PROCEDURE [dbo].[GetLeadByMobilePhone](
  @countryCallingCode as VARCHAR(4),
  @mobilePhone as VARCHAR(12)
)
AS
BEGIN
  SELECT mobilePhone,
    countryCallingCode,
    name,
    lastName,
    email,
    confirmationCode,
    password,
    confirmed,
    signUpDate,
    subscriptionInfo
  FROM [dbo].[Lead] WITH(NOLOCK)
  WHERE MobilePhone = @mobilePhone
    AND CountryCallingCode = @countryCallingCode
END
GO