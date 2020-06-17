IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'DeleteLeadByMobilePhone')
BEGIN
  DROP PROCEDURE [dbo].[DeleteLeadByMobilePhone]
END

/****** Object:  StoredProcedure [dbo].[DeleteLeadByMobilePhone]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[DeleteLeadByMobilePhone] ******/
-- =============================================
-- Author:      Luis Maldonado
-- Description: Deletes a lead by mobile phone
-- Example: EXEC [dbo].[DeleteLeadByMobilePhone]
-- =============================================
CREATE PROCEDURE [dbo].[DeleteLeadByMobilePhone](
  @countryCallingCode AS VARCHAR(4),
  @mobilePhone AS VARCHAR(12)
)
AS
BEGIN


  SELECT mobilePhone,
    countryCallingCode,
    name,
    lastName,
    email,
    signUpDate
  FROM [dbo].[Lead]
  WHERE MobilePhone = @mobilePhone
    AND CountryCallingCode  = @countryCallingCode;

  DELETE FROM [dbo].[Lead] 
    WHERE MobilePhone= @mobilePhone
    AND CountryCallingCode = @countryCallingCode;

END
GO