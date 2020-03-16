import { statisticsui } from "./ui";
import { totalCases, container } from "./DOM";
import { statistics } from "./data";

export const renderStatistics = stats => {
  const total = [...statistics].reduce((total, stat) => {
    return total + stat.confirmed;
  }, 0);

  totalCases.innerText = total;
  container.innerHTML = statisticsui(stats);
};
