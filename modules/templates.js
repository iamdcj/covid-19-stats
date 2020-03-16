import { returnDate } from "./date-time";

export const statisticsui = stats => `
  <ul class="grid">
    ${stats
      .filter(({ country }) => country !== "China")
      .map(statistic => statisticUI(statistic))
      .sort()
      .join("")}
  </ul>
`;

const statisticUI = ({ country, lastUpdate, confirmed, deaths }) =>
  `
    <li>
      <div class="stat  grid__item">
        <h2><span class="icon  flag-icon-squared  flag-icon-${country
          .substring(0, 2)
          .toLowerCase()}"></span>${country}</h2>
        <p>✅${confirmed} confirmed cases</p>
        <p>☠️${deaths} as of ${returnDate(lastUpdate)}</p>
      </div>
    </li>
  `;
