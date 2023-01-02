
const queries = {
    last5: "select top 5 * from FilmRecord order by ratedate desc",
    countries: "select countryid, name from Countries"
}

module.exports = queries;

