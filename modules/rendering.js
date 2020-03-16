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

  container.innerHTML = statisticsui(stats);
};
