
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
join [Filmmemo].[dbo].[Directors] dir on films.directorid = dir.id  where films.id =`
}

module.exports = queries;

