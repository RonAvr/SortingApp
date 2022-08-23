function sawp(arr, x, y) {
  let temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function bubbleSort(arr) {
  const newArr = [...arr]
  const n = newArr.length;
  let i;
  let j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (newArr[j] > newArr[j + 1]) {
        sawp(newArr, j, j + 1);
      }
    }
  }
  return newArr
}

export default bubbleSort;
