function merge(arr, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;
  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < n1 && j < n2) {
    const mergedArr = L.concat(...R)
    let flag = 0;
      console.log('**********')
      console.log({arr})
      console.log({L})
      console.log({R})

    if (L[i] <= R[j]) {
      flag = 0;
      arr[k] = L[i];
      i++;
      k++
      console.log('--------')
      console.log('a')
      
      let c = L.slice(i).concat(...R)
      console.log({c})
      console.log(k)
      Array.prototype.splice.apply(arr, [k, c.length].concat(c));
    } else {
      console.log('--------')
      console.log('b')
      flag = 1;
      arr[k] = R[j];
      j++;
      k++

      let c = L.slice(i).concat(...R.slice(j))
      Array.prototype.splice.apply(arr, [k, c.length].concat(c));
    }
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {

    arr[k] = L[i];
    i++;
    k++;
    console.log('--------')

    console.log('c');
    

  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {

    arr[k] = R[j];
    j++;
    k++;
  console.log('--------')

    console.log('d');

  }

  k++;
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr, l, r) {
  if (l >= r) {
    return; //returns recursively
  }
  var m = l + parseInt((r - l) / 2);

  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}


ar = [129.23,246.06, 92.42, 33.07,213.74,240.82,27.1,55.45,198.66, 151.85]
arr = [129.23,246.06, 92.42, 33.07,213.74,240.82,27.1,55.45,198.66]
ar.sort(function(a, b){return a-b});
// console.log(ar)
//   arr = [6,4,5,3,1]
mergeSort(arr, 0 , arr.length-1)
console.log(arr)