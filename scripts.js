{
  const endpoint =
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats";

  const request = fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "6355586673mshe6fe75562f6751dp1f288cjsn9deb12384837"
    }
  });

  request
    .then(response => response.json())
    .then(({ data }) => console.log(data.covid19Stats))
    .catch(error => console.error(error.message));
}
