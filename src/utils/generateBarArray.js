function generateBarArray(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push({
      height: Math.random() * 251,
      status: "regular",
    });
  }

  return arr;
}

export default generateBarArray;
