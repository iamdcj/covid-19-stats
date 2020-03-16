import { searchInput } from "./DOM";
import { statistics, setStatistics } from "./data";
import { renderStatistics } from "./rendering";

function handleSearch(event) {
  const results = statistics.filter(({ country }) => {
    return country.toLowerCase().includes(event.target.value.toLowerCase());
  });

  renderStatistics(results);
}

if (!searchInput) {
  return;
}

searchInput.addEventListener("keyup", handleSearch, true);
