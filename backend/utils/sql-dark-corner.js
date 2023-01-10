
const queries = {
    last5: "select top 5 * from FilmRecord order by ratedate desc",
    countries: "select countryid, name from Countries",
    alldirectors: "select * from Directors where directorname not like '%Rep Etido%'",
    getAll: "select * from FilmRecord order by ratedate desc"
}

module.exports = queries;

