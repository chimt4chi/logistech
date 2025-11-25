function bestFitBin(bins, pkgSize) {
  let left = 0;
  let right = bins.length - 1;
  let result = null;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (bins[mid].capacity >= pkgSize) {
      result = bins[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

module.exports = bestFitBin;
