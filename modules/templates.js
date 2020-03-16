import { returnDate } from "./date-time";

export const statisticsui = stats => `
  <ul class="grid">
    ${stats
      .map(statistic => statisticUI(statistic))
      .sort((a, b) => (a.confirmed > b.confirmed ? -1 : 1))
      .join("")}
  </ul>
`;

const statisticUI = ({ country, lastUpdate, confirmed, deaths }) =>
  `
    <li>
      <div class="stat  grid__item">
        <h2>🌍 ${country}</h2>
        <p>☣️ ${confirmed} confirmed cases</p>
        <p>☠️ ${deaths} (${Math.floor(
    (deaths * 100) / confirmed
  )}%) as of ${returnDate(lastUpdate)}</p>
      </div>
    </li>
  `;
