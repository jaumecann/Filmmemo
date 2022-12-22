 TRUNCATE TABLE [Filmmemo].[dbo].[Countries]
GO
 
-- import the file
BULK INSERT [Filmmemo].[dbo].[Countries]
FROM 'C:\Users\Jaume\Desktop\JAUME\Coding folder\FilmMemo-Project\Countries.csv'
WITH
(
        FORMAT='CSV',
		CODEPAGE = '65001',
		ROWTERMINATOR = '0x0A'
)
GO