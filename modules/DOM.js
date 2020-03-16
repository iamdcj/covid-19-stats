import { statisticsui } from "./templates";

const container = document.querySelector("div");

export const renderStatistics = statistics => {
  container.innerHTML = statisticsui(statistics);
};
