
const queries = {
    last5: "select top 5 * from FilmRecord order by ratedate desc",
    countries: "select countryid, name from Countries",
    alldirectors: "select * from Directors where directorname not like '%Rep Etido%'",
    getAll: "SELECT  rec.[id],[title],[rating],[yearFilm],[ratedate],[ratehour],dir.directorname,[directorid],[country],[poster],[director2] FROM [Filmmemo].[dbo].[FilmRecord] rec join [Filmmemo].[dbo].[Directors] dir on rec.directorid = dir.id order by ratedate desc",
}

module.exports = queries;

