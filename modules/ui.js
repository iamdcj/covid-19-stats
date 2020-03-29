import { returnDate } from "./date-time";
import { main, responsive } from "./DOM";

export const statisticsUI = stats => {
  main.innerHTML = stats
    .map(({ country }, index) => statisticsMain(country, index))
    .join("");
  responsive.innerHTML = stats
    .map((statistic, index) => statisticsResponsive(statistic, index))
    .join("");
};

const handleRate = (deaths, rate) => {
  if (!deaths) {
    return `N/A`;
  }

  return rate < 1 ? `< 1%` : `${rate}%`;
};

const statisticsMain = (country, index) =>
  ` <tr>
      <td>${country}</td>
    </tr>
  `;

const statisticsResponsive = ({ lastUpdate, confirmed, deaths, rate }, index) =>
  ` <tr>
      <td  colspan="2" class="color--orange text--center text--strong">${confirmed}</td>
      <td  colspan="2" class="color--red text--center text--strong">${deaths}</td>
      <td class="text--center">
          ${handleRate(deaths, rate)}
      </td>
      <td class="text--right text--small">${returnDate(lastUpdate)}</td>
    </tr>
  `;
