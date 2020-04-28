import { request } from "./modules/requests";
import { renderStatistics } from "./modules/rendering";
import { setStatistics } from "./modules/data";
import "./modules/events";

{
  const returnMortalityRate = (deaths, confirmed) => {
    console.log(deaths);
    console.log(confirmed);

    return Math.round((deaths * 100) / confirmed);
  };

  request
    .then((response) => response.json())
    .then(({ features }) => {
      if (!features) {
        throw Error("No data");
      }

      const statistics = features
        .map(
          ({
            attributes: {
              Last_Update: lastUpdate,
              Confirmed: confirmed,
              Recovered: recovered,
              Deaths: deaths,
              Active: active,
              Country_Region: country,
            },
          }) => {
            
            return {
              lastUpdate,
              confirmed,
              recovered,
              deaths,
              active,
              country,
            };
          }
        )
        .filter(({ confirmed }) => confirmed)
        .reduce((statistics, group) => {
          const { country: currentCountry } = group;

          const existingGroup = statistics.find(
            ({ country }) => country === currentCountry
          );

          if (existingGroup) {
            existingGroup.confirmed += group.confirmed;
            existingGroup.deaths += group.deaths;
            existingGroup.recovered += group.recovered;
          }



          return existingGroup ? [...statistics] : [...statistics, group];
        }, [])
        .map(data => {
         const rate = returnMortalityRate(data.deaths, data.confirmed);

          return {
            ...data,
            rate
          }
        })
        .sort((a, b) => b.confirmed - a.confirmed);

      setStatistics(statistics);

      return statistics;
    })
    .then((statistics) => renderStatistics(statistics))
    .catch((error) => console.error(error.message));
}
