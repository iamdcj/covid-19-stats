import { sortControls } from "./DOM";
import { renderedStatistics } from "./data";
import { renderStatistics } from "./rendering";

const sortIcons = {
  asc: "↑",
  desc: "↓"
};

const setSortAction = (_El, order) => {
  const sortIndicator = _El.querySelector("span");
  _El.setAttribute("data-sort-order", order);
  sortIndicator.innerText = sortIcons[order] || "↕";
};

function handleSorting(event) {
  const _El = event.target;

  if (!_El) {
    return;
  }

  const sortIndicator = _El.querySelector("span");
  const sortType = event.target.dataset.sort;
  const sortOrder = event.target.dataset.sortOrder;

  sortControls.forEach(control => {
    setSortAction(control, "");
  });

  const sorted = renderedStatistics.sort((a, b) => {
    if (!sortOrder || sortOrder === "asc") {
      setSortAction(_El, "desc");

      if (sortType === "country") {
        return b[sortType] < a[sortType] ? -1 : 1;
      } else {
        return b[sortType] - a[sortType];
      }
    } else {
      setSortAction(_El, "asc");
      if (sortType === "country") {
        return a[sortType] > b[sortType] ? 1 : -1;
      } else {
        return a[sortType] - b[sortType];
      }
    }
  });

  renderStatistics(sorted);
}

export { handleSorting };
