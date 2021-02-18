export function zip<T>(...arrays: T[][]) {
  return arrays[0].map(function (_, idx) {
    return arrays.map(function (array) {
      return array[idx];
    });
  });
}
