/****** Object:  Table [dbo].[Lead]    Script Date: 02/06/2020 11:54:28 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lead]
(
  [MobilePhone] [varchar](12) NOT NULL,
  [CountryCallingCode] [varchar](4) NOT NULL,
  [Name] [varchar](100) NOT NULL,
  [LastName] [varchar](100) NOT NULL,
  [Email] [varchar](50) NOT NULL,
  [ConfirmationCode] [varchar](4) NULL,
  [Password] [varchar](60) NOT NULL,
  [Confirmed] [bit] NULL,
  [SignUpDate] [datetime] NOT NULL,
  [SubscriptionInfo] NVARCHAR(MAX) NULL,
) ON [PRIMARY]
GO
/****** Object:  Index [SignUpConfirmationCode]    Script Date: 02/06/2020 11:54:28 a. m. ******/
CREATE UNIQUE NONCLUSTERED INDEX [SignUpConfirmationCode] ON [dbo].[Lead]
(
	[ConfirmationCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [SignUpCountryCallingCodePhoneNumber]    Script Date: 02/06/2020 11:54:28 a. m. ******/
CREATE UNIQUE NONCLUSTERED INDEX [SignUpCountryCallingCodePhoneNumber] ON [dbo].[Lead]
(
	[MobilePhone] ASC,
	[CountryCallingCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [SignUpDate]    Script Date: 02/06/2020 11:54:28 a. m. ******/
CREATE NONCLUSTERED INDEX [SignUpDate] ON [dbo].[Lead]
(
	[SignUpDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO