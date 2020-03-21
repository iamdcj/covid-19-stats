import { searchInput, sortControls } from "./DOM";
import { handleSearch } from "./searching";
import { handleSorting } from "./sorting";

searchInput.addEventListener("keyup", handleSearch, true);

sortControls.forEach(control => {
  control.addEventListener("click", handleSorting, true);
});
