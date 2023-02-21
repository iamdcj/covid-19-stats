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

function handleSorting() {
  const _El = this;

  if (!_El) {
    return;
  }

  const sortType = _El.dataset.sort;
  const sortOrder = _El.dataset.sortOrder;

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
