 TRUNCATE TABLE [Filmmemo].[dbo].[Filmmaster]
GO
 
-- import the file
BULK INSERT [Filmmemo].[dbo].[Filmmaster]
FROM 'C:\Users\Jaume\Desktop\JAUME\Coding folder\FilmMemo-Project\Filmmemomain.csv'
WITH
(
        FORMAT='CSV',
		CODEPAGE = '65001'
)
GO