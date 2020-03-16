import { returnDate } from "./date-time";

export const statisticsui = stats => `
  <table>
  <tr>
    <th>#</th>
    <th>🌍 Country</th>
    <th class="text--center">✔ Confirmed</th>
    <th class="bg--red text--center">☠️Deaths</th>
    <th class="text--center">Mortality Rate</th>
    <th>📅 Last Updated</th>
  </tr>
    ${stats
      .sort((a, b) => (a.confirmed > b.confirmed ? -1 : 1))
      .map((statistic, index) => statisticUI(statistic, index))
      .join("")}
  </table>
`;

const statisticUI = ({ country, lastUpdate, confirmed, deaths }, index) =>
  ` <tr>
        <td>${index + 1}</td>
        <td>${country}</td>
        <td class="text--center">${confirmed}</td>
        <td class="bg--red-light text--center text--strong">${deaths}</td>
        <td class="text--center">${
          deaths ? `${Math.round((deaths * 100) / confirmed)}` : `N/A`
        }</td>
        <td>${returnDate(lastUpdate)}</td>
    </tr>
  `;
