export const returnDate = date => {
  const _Date = new Date(date);

  if (isNaN(_Date)) return;

  return _Date.toLocaleDateString("en-us");
};
