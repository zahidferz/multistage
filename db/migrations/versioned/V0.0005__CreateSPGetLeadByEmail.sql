IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'GetLeadByemail')
BEGIN
  DROP PROCEDURE [dbo].[GetLeadByemail]
END

/****** Object:  StoredProcedure [dbo].[GetLeadByemail]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[GetLeadByemail] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Get data from lead by country calling code + mobile phone
-- Example: EXEC [dbo].[GetLeadByemail]
-- =============================================
CREATE PROCEDURE [dbo].[GetLeadByemail](
  @email as VARCHAR(50)
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
  WHERE Email = @email
END
GO