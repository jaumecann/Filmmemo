
const queries = {
    last5: "select top 5 * from FilmRecord order by ratedate desc",
    countries: "select countryid, name from Countries",
    alldirectors: "select * from Directors where directorname not like '%Rep Etido%'",
    getAll: "SELECT  rec.[id],[title],[rating],[yearFilm],[ratedate],[ratehour],dir.directorname,[directorid],[country],[poster],[director2] FROM [Filmmemo].[dbo].[FilmRecord] rec join [Filmmemo].[dbo].[Directors] dir on rec.directorid = dir.id order by ratedate desc",
    getFilm: `SELECT films.[id],[title],[rating],[yearFilm]
    ,[ratedate]
    ,[ratehour]
    ,[directorid]
    ,dir.[directorname]
    ,[country]
    ,ctry.[name] 
    ,[poster]
    ,[director2]
FROM [Filmmemo].[dbo].[FilmRecord] films
join [Filmmemo].[dbo].[Countries] ctry on films.country = ctry.countryid
join [Filmmemo].[dbo].[Directors] dir on films.directorid = dir.id  where films.id =`,
    getDayRecords: "SELECT id, CAST(totalpoints AS decimal(10,2))/CAST(film_number AS decimal(10,2)) as avrg,  RANK() OVER (ORDER BY CAST(totalpoints AS decimal(10,2))/CAST(film_number AS decimal(10,2)) DESC) AS ranking FROM DayRecord",
    getTotalsCountry: "SELECT [country], name, COUNT(*) AS record_count, ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER ()), 2) AS percentage, AVG(REC.rating * 1.0) AS average FROM [Filmmemo].[dbo].[FilmRecord] REC JOIN [Filmmemo].[dbo].[Countries] CTR on REC.country = CTR.countryid GROUP BY [country], name order by record_count desc",
    filmsPerDay: "SELECT FORMAT(ratedate, 'MM-dd') AS day_month, COUNT(*) AS record_count,STRING_AGG(CONVERT(VARCHAR, title), ', ') AS ids_for_day,STRING_AGG(CAST(YEAR(ratedate) AS VARCHAR), ', ') AS years_for_day FROM [Filmmemo].[dbo].[FilmRecord] GROUP BY FORMAT(ratedate, 'MM-dd') ORDER BY FORMAT(ratedate, 'MM-dd');",
    getTotalYears:"select yearFilm, COUNT(yearFilm) AS record_count,ROUND(AVG(CAST(rating AS DECIMAL(10, 3))), 3) AS average_rating FROM FilmRecord GROUP BY yearFilm order by yearFilm desc",
    seenXYear:"select YEAR(ratedate) AS year, COUNT(*) AS total FROM FilmRecord group by YEAR(ratedate) order by YEAR desc"
}

module.exports = queries;

