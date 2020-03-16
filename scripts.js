import { request } from "./modules/requests";
import { renderStatistics } from "./modules/DOM";

{
  request
    .then(response => response.json())
    .then(({ data }) =>
      data.covid19Stats
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
        }, [])
    )
    .then(statitistics => renderStatistics(statitistics))
    .catch(error => console.error(error.message));
}
