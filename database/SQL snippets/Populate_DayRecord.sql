/****** Script for SelectTopNRows command from SSMS  ******/



/* Meravollós snippet de chatgtp per a generar tots els totalpoints y film_number per a cada dia a partir del que hi hagi a FilmRecord*/
/* I have a table called FilmRecord with this column name and type name

id	int identity,
title	nvarchar,
rating	tinyint,
yearFilm smallint,
ratedate date,
ratehour nchar,
directorid int,
country	nchar,
poster nvarchar,
director2 int,


I have another table called DayRecord with this columns:
 (id,
totalpoints,
film_number)

id is already inserted in the table and equals DDMM for every day of a year (including 2902 for february 29). totalpoints and film_number are 0 for every record.
my goal is to get a script that goes through every single record of FilmRecord and looks at the ratedate columns,
whose format is YYYY-MM-DD, and then for that record finds same day and month in DayRecord and adds 1 to film_number and the rating value to totalpoints

AJUSTEM DEMANDA

I just get 1 film_number for every record. In my table FilmRecord there can be several records for each film_number

*/

UPDATE DayRecord
SET totalpoints = agg.totalpoints,
    film_number = agg.film_count
FROM DayRecord d
INNER JOIN (
  SELECT FORMAT(fr.ratedate, 'ddMM') AS day_month,
         SUM(fr.rating) AS totalpoints,
         COUNT(DISTINCT fr.id) AS film_count
  FROM FilmRecord fr
  WHERE fr.ratedate IS NOT NULL
  GROUP BY FORMAT(fr.ratedate, 'ddMM')
) AS agg ON d.id = agg.day_month;