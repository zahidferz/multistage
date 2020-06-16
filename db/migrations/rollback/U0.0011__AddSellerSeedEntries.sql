IF EXISTS (SELECT *
FROM [dbo].[Seller])
BEGIN
  DELETE FROM [dbo].[Seller] WHERE SellerId = 1
END

IF EXISTS (SELECT *
FROM [dbo].[Seller])
BEGIN
  DELETE FROM [dbo].[Seller] WHERE SellerId = 2
END