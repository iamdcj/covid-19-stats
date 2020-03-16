import { statisticsui } from "./templates";

const container = document.querySelector("div");
const totalCases = document.querySelector(".total");

export const renderStatistics = statistics => {
  const total = statistics.reduce((total, stat) => {
    return total + stat.confirmed;
  }, 0);

  totalCases.innerText = total;

  container.innerHTML = statisticsui(statistics);
};
