export let statistics = [];
export let renderedStatistics = [];

export const setStatistics = data => {
  statistics = [...data];
};

export const setRenderedStatistics = data => {
  renderedStatistics = [...data];
};
