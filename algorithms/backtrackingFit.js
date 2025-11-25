function backtrackingFit(packages, space) {
  const result = [];
  const n = packages.length;

  function backtrack(i, remaining, chosen) {
    if (remaining < 0) return false;
    // base case
    if (i === n) {
      result.push(...chosen);
      return true;
    }

    // Choice 1: take this package
    chosen.push(packages[i]);
    if (backtrack(i + 1, remaining - packages[i].size, chosen)) return true;
    chosen.pop();

    // Choice 2: skip this package
    if (backtrack(i + 1, remaining, chosen)) return true;

    return false;
  }

  // invoke the algorithm
  return backtrack(0, space, []) ? result : null;
}

module.exports = backtrackingFit;
