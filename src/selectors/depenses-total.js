export default (depenses) => {
  return depenses
    .map((depense) => depense.amount)
    .reduce((sum, value) => sum + value, 0);
};
