import { request } from "./modules/requests";
import { renderStatistics } from "./modules/rendering";
import { setStatistics } from "./modules/data";
import "./modules/events";

{
  request
    .then(response => response.json())
    .then(({ data }) => {
      const statistics = data.covid19Stats
        .filter(({ confirmed }) => confirmed > 0)
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
    .catch(error => console.error(error.message));
}
