IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'ConfirmLead')
BEGIN
  DROP PROCEDURE [dbo].[ConfirmLead]
END

/****** Object:  StoredProcedure [dbo].[ConfirmLead]    Script Date:8/06/2020 10:07:25 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Yocelin GR
-- Description: Confirm a lead register and release the confirmation code
-- Example: EXEC [dbo].[ConfirmLead] '5527'
-- =============================================
CREATE PROCEDURE [dbo].[ConfirmLead]
  (
  @mobilePhone varchar(12)
  ,
  @countryCallingCode varchar(4)
)
AS
BEGIN

  UPDATE [dbo].[Lead]
  SET ConfirmationCode = null,
  Confirmed = 1
  WHERE MobilePhone = @mobilePhone AND CountryCallingCode = @countryCallingCode

  EXEC [dbo].[GetLeadByMobilePhone] @countryCallingCode, @mobilePhone

END
GO