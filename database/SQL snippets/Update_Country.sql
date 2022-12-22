/****** Script for SelectTopNRows command from SSMS  ******/


  UPDATE [Filmmemo].[dbo].[FilmRecord] SET country = 'CHE' 
  where country LIKE '%CHK%' 

  SELECT * FROM  [Filmmemo].[dbo].[Countries] 
  --WHERE NAME LIKE '%Chad%'