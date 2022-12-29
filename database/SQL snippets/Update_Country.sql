/****** Script for SelectTopNRows command from SSMS  ******/


  UPDATE [Filmmemo].[dbo].[Countries] SET countryid = 'IRK' 
  where countryid LIKE '%IRQ%' 

  -- UPDATE [Filmmemo].[dbo].[FilmRecord] SET country = 'ICE' 
  --where country LIKE '%ISL%' 

  SELECT * FROM  [Filmmemo].[dbo].[Countries] 
  --WHERE NAME LIKE '%Greece%'