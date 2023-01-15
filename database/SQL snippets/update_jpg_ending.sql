/****** Script for SelectTopNRows command from SSMS  ******/
UPDATE [Filmmemo].[dbo].[FilmRecordBackup]
SET poster = CONCAT(poster, '.jpg') WHERE poster IN
(SELECT 
      poster
  FROM [Filmmemo].[dbo].[FilmRecordBackup]
  where SUBSTRING(poster, (LEN(poster)+1) -3, 3) <> 'jpg')