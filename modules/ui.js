import { returnDate } from "./date-time";

const returnMortalityRate = (deaths, confirmed) => {
  const percentage = Math.round((deaths * 100) / confirmed);

  return percentage < 1 ? "&lt; 1%" : `${percentage}%`;
};

export const statisticsui = stats =>
  stats
    .sort((a, b) => (a.confirmed > b.confirmed ? -1 : 1))
    .map((statistic, index) => statisticUI(statistic, index))
    .join("");

const statisticUI = ({ country, lastUpdate, confirmed, deaths }, index) =>
  ` <tr>
        <td>${country}</td>
        <td class="text--center">${confirmed}</td>
        <td class="text--center text--strong">${deaths}</td>
        <td class="text--center">
          ${deaths ? returnMortalityRate(deaths, confirmed) : `N/A`}
        </td>
        <td class="text--right text--small">${returnDate(lastUpdate)}</td>
    </tr>
  `;
