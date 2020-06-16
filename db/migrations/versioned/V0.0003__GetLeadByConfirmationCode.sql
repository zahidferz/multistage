IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetSignUpByMobilePhone')
BEGIN
  DROP PROCEDURE [dbo].[GetSignUpByMobilePhone]
END

/****** Object:  StoredProcedure [dbo].[GetSignUpByMobilePhone]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetLeadByConfirmationCode] ******/
-- =============================================
-- Author:      Gustavo Mora
-- Description: Get data from lead by country calling code + mobile phone
-- Example: EXEC [dbo].[GetLeadByConfirmationCode]
-- =============================================
CREATE PROCEDURE [dbo].[GetLeadByConfirmationCode](
  @confirmationCode as VARCHAR(4)
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
  WHERE ConfirmationCode = @confirmationCode
END
GO