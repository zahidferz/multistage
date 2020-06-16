IF EXISTS (SELECT *
FROM sys.objects
WHERE type = 'P' AND name = 'InsertLeadRegister')
BEGIN
  DROP PROCEDURE [dbo].[InsertLeadRegister]
END

/****** Object:  StoredProcedure [dbo].[InsertLeadRegister]    Script Date: 02/06/2020 12:48:45 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Yocelin GR
-- Description: Insert SignUp provisional register
-- Example: EXEC [dbo].[InsertLeadRegister] '5527258173', '+52', 'Yocelin', 'Garcia Romero', 'gr.yocelin@gmail.com', '1234', 0x70616E7175656369746F7300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
-- =============================================
CREATE PROCEDURE [dbo].[InsertLeadRegister]
  (
  @mobilePhone varchar(12)
  ,
  @countryCallingCode varchar(4)
  ,
  @name varchar(100)
  ,
  @lastName varchar(100)
  ,
  @email varchar(50)
  ,
  @confirmationCode varchar(4)
  ,
  @encodedPassword varchar(60)
  ,
  @confirmed bit = 0
  ,
  @subscriptionInfo NVARCHAR(max) = NULL
)
AS
BEGIN
  DECLARE @signUpDate as datetime
  SET @signUpDate = GETDATE()

  INSERT INTO [dbo].[Lead]
    (
    MobilePhone
    , CountryCallingCode
    , Name
    , LastName
    , Email
    , ConfirmationCode
    , Password
    , Confirmed
    , SignUpDate
    , SubscriptionInfo
    )
  VALUES
    (
      @mobilePhone
    , @countryCallingCode
    , @name
    , @lastName
    , @email
    , @confirmationCode
    , @encodedPassword
    , @confirmed
    , @signUpDate
    , @subscriptionInfo
  )

  SELECT @mobilePhone as mobilePhone
    , @countryCallingCode as countryCallingCode
    , @name as name
    , @lastName as lastName
    , @email as email
    , @confirmationCode as confirmationCode
    , @encodedPassword as password
    , @confirmed as confirmed
    , @signUpDate as signUpDate
    , @subscriptionInfo as subscriptionInfo
END
GO