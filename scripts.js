import { request } from "./modules/requests";
import { renderStatistics } from "./modules/DOM";

{
  request
    .then(response => response.json())
    .then(({ data }) => renderStatistics(data.covid19Stats))
    .catch(error => console.error(error.message));
}
