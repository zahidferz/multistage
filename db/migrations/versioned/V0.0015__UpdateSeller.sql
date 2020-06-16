

IF EXISTS (SELECT *
FROM [dbo].[Seller]
WHERE SellerId = 2 )
BEGIN
  UPDATE [dbo].[Seller] SET SubscriptionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.-M9qqOCQMcCN7rU8pB7nnsSqznJW8oRrrTNeh55lww8' WHERE SellerId = 2
END