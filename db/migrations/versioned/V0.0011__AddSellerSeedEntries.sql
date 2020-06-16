IF NOT EXISTS (SELECT 1
FROM [dbo].[Seller]
WHERE [SellerId] = 1 )
INSERT INTO [dbo].[Seller]
  ([SubscriptionToken])
VALUES('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.L09c6so8MTlyqIHuIDxYFhASMhdRf-kNGjm8M1RALf0')


IF NOT EXISTS (SELECT 1
FROM [dbo].[Seller]
WHERE [SellerId] = 2 )
INSERT INTO [dbo].[Seller]
  ([SubscriptionToken])
VALUES('TBD')