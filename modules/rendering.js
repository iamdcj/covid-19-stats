import { statisticsui } from "./ui";
import { totalCases, totalDeaths, container } from "./DOM";
import { statistics } from "./data";

export const renderStatistics = stats => {
  totalDeaths.innerText = [...statistics].reduce(
    (total, stat) => total + stat.deaths,
    0
  );

  totalCases.innerText = [...statistics].reduce(
    (total, stat) => total + stat.confirmed,
    0
  );

  if (stats.length < 1) {
    container.innerHTML = `<tr><td colspan="5"><p>Sorry, no results for that search. Please adjust your query.<p></td></tr>`;
  } else {
    container.innerHTML = statisticsui(stats);
  }
};
