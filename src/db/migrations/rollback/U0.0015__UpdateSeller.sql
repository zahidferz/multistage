IF EXISTS (SELECT *
FROM [dbo].[Seller]
WHERE SellerId = 2 )
BEGIN
  UPDATE [dbo].[Seller] SET SubscriptionToken = 'TBD' WHERE SellerId = 2
END