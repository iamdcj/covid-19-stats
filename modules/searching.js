import { searchInput, sortControls } from "./DOM";
import { statistics } from "./data";
import { renderStatistics } from "./rendering";

function handleSearch(event) {
  const results = statistics.filter(({ country }) => {
    return country.toLowerCase().includes(event.target.value.toLowerCase());
  });

  renderStatistics(results);
}

export { handleSearch };
