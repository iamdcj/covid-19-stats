import { request } from "./modules/requests";
import { renderStatistics } from "./modules/rendering";
import { setStatistics } from "./modules/data";
import "./modules/events";
import { _Loader } from "./modules/DOM";

{
  request
    .then(response => response.json())
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
              Country_Region: country
            }
          }) => ({ lastUpdate, confirmed, recovered, deaths, active, country })
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
        }, []);

      setStatistics(statistics);

      return statistics;
    })
    .then(statistics => renderStatistics(statistics))
    .catch(error => console.error(error.message))
    .finally(() => {
      _Loader.classList.remove("is--active");
    });
}
