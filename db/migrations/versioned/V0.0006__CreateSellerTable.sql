/****** Object:  Table [dbo].[Seller]    Script Date: 02/06/2020 11:54:28 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Seller]
(
  [SellerId] [int] NOT NULL IDENTITY,
  [SubscriptionToken] [varchar](255) NOT NULL,
  CONSTRAINT PK_SellerId_Sellers PRIMARY KEY  NONCLUSTERED (SellerId ASC) 
   WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
