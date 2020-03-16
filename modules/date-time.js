export const returnDate = date => {
  const _Date = new Date(date);

  if (isNaN(_Date)) return;

  const settings = { year: "numeric", month: "long", day: "numeric" };
  return _Date.toLocaleDateString("en-us", settings);
};
