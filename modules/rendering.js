import { numberFormatter, statisticsUI } from './ui';
import { totalCases, totalDeaths } from './DOM';
import { statistics, setRenderedStatistics } from './data';

export const renderStatistics = (stats) => {
  const deathCount = [...statistics].reduce((total, { deaths = 0 }) => {
    return total + deaths;
  }, 0);

  const caseCount = [...statistics].reduce((total, { confirmed = 0 }) => {
    return total + confirmed;
  }, 0);

  totalDeaths.innerText = numberFormatter.format(deathCount);
  totalCases.innerText = numberFormatter.format(caseCount);

  if (stats.length < 1) {
    container.innerHTML = `<tr><td colspan="5"><p>Sorry, no results for that search. Please adjust your query.<p></td></tr>`;
  } else {
    setRenderedStatistics(stats);
    statisticsUI(stats);
  }
};
