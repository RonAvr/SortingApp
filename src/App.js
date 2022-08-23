import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/UI/Header";
import BarContainer from "./components/Bars/BarContainer";
import containerClass from "./components/Bars/BarContainer.module.css";
import generateBarArray from "./utils/generateBarArray";
// import structuredClone from '@ungap/structured-clone';

// import bubbleSort from "./utils/bubbleSort";

const XL_ARR = 80;
const LARGE_ARR = 60;
const MEDIUM_ARR = 40;
const SMALL_ARR = 20;
const VERY_FAST_SPEED = 1;
const FAST_SPEED = 20;
const REGULAR_SPEED = 100;
const SLOW_SPEED = 500;

const sizeDict = { XL: XL_ARR, L: LARGE_ARR, M: MEDIUM_ARR, S: SMALL_ARR };
const speedDict = {
  V: VERY_FAST_SPEED,
  F: FAST_SPEED,
  R: REGULAR_SPEED,
  S: SLOW_SPEED,
};

let stop = false;
let originBars = [];

function swap(arr, x, y) {
  let temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMaxAndMinValues(arr) {
  const values_arr = arr.map((item) => item.height);
  const res_arr = [
    Math.min(...values_arr).toFixed(2),
    Math.max(...values_arr).toFixed(2),
  ];
  return res_arr;
}

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const [barsSize, setBarsSize] = useState("S");
  const [bars, setBars] = useState(generateBarArray(sizeDict[barsSize]));
  const [speed, setSpeed] = useState("R");
  const [count, setCount] = useState(0);
  const [algo, setAlgo] = useState("B");
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);

  useEffect(() => {
    originBars = structuredClone(bars);
    setMaxVal(getMaxAndMinValues(bars)[1]);
    setMinVal(getMaxAndMinValues(bars)[0]);
  }, []);

  function resetArrayHandler(e) {
    for (let i = 0; i < originBars.length; i++) {
      originBars[i].status = "regular";
    }
    setHasStarted(false);
    setCount(0);
    setBars(originBars);
  }

  function stopSortingHanlder(e) {
    stop = !stop;
  }

  function setSpeedHandler(e) {
    if (!canStart) return;
    setSpeed(e.target.value);
  }

  function generateNewArrayHandler(e) {
    if (!canStart) return;

    const newSize = sizeDict[e.target.value];
    setBarsSize(e.target.value);
    setHasStarted(false);
    setCount(0);
    const newArr = generateBarArray(newSize);
    setBars(newArr);
    setMaxVal(getMaxAndMinValues(newArr)[1]);
    setMinVal(getMaxAndMinValues(newArr)[0]);
    originBars = structuredClone(newArr);
  }

  function setAlgoHandler(e) {
    setAlgo(e.target.value);
  }

  async function selectionSort(arr) {
    const newArr = [...arr];
    const n = newArr.length;
    let i, j, min_idx;

    // One by one move boundary of unsorted subarray
    for (i = 0; i < n - 1; i++) {
      setCount((prevState) => (prevState += 1));
      // Find the minimum element in unsorted array
      min_idx = i;
      newArr[min_idx].status = "min";

      if (stop) {
        setCanStart(true);
        break;
      }
      for (j = i + 1; j < n; j++) {
        if (stop) {
          setCanStart(true);
          break;
        }
        newArr[j].status = "progress";
        setCount((prevState) => (prevState += 1));

        setBars(() => {
          setBars(newArr);
        });
        await sleep(speedDict[speed]);

        if (newArr[j].height < newArr[min_idx].height) {
          newArr[min_idx].status = "regular";
          min_idx = j;
          newArr[min_idx].status = "min";
          setBars(() => {
            setBars(newArr);
          });
          await sleep(speedDict[speed]);
        } else {
          newArr[j].status = "regular";
        }

        setBars(() => {
          setBars(newArr);
        });
        await sleep(speedDict[speed]);
      }

      // Swap the found minimum element with the first element
      swap(newArr, min_idx, i);
      newArr[i].status = "finished";
      setBars(() => {
        setBars(newArr);
      });
      await sleep(speedDict[speed]);
    }
    if (j === n) newArr[n - 1].status = "finished";
    stop = false;
    setCanStart(true);
  }

  async function insertionSort(arr) {
    const newArr = [...arr];
    const n = newArr.length;
    let i, key, j;

    for (i = 1; i < n; i++) {
      setCount((prevState) => (prevState += 1));

      if (stop) {
        setCanStart(true);
        break;
      }

      key = newArr[i];
      j = i - 1;
      for (let k = 0; k < i; k++) newArr[k].status = "inserted";
      newArr[i].status = "progress";
      setBars(() => {
        setBars(newArr);
      });
      await sleep(speedDict[speed]);

      /* Move elements of arr[0..i-1], that are  
          greater than key, to one position ahead  
          of their current position */
      while (j >= 0 && newArr[j].height > key.height) {
        setCount((prevState) => (prevState += 1));

        newArr[j].status = "progress";
        setBars(() => {
          setBars(newArr);
        });
        await sleep(speedDict[speed]);

        if (stop) {
          setCanStart(true);
          break;
        }

        newArr[j].status = "inserted";
        setBars(() => {
          setBars(newArr);
        });
        await sleep(speedDict[speed]);
        newArr[j + 1] = newArr[j];
        j = j - 1;
      }
      if (stop) {
        setCanStart(true);
        break;
      }

      newArr[j + 1] = key;
      newArr[j + 1].status = "min";
      setBars(() => {
        setBars(newArr);
      });
      await sleep(speedDict[speed]);

      for (let i = 0; i < n; i++) {
        newArr[i].status = "regular";
      }

      setBars(() => {
        setBars(newArr);
      });
      await sleep(speedDict[speed]);
    }

    if (i === n) {
      for (let k = 0; k < n; k++) {
        newArr[k].status = "finished";
      }
    }

    stop = false;
    setCanStart(true);
  }

  async function bubbleSort(arr) {
    const newArr = [...arr];
    const n = newArr.length;
    for (let i = 0; i < n - 1; i++) {
      setCount((prevState) => (prevState += 1));
      if (stop) {
        setCanStart(true);
        break;
      }
      for (let j = 0; j < n - i - 1; j++) {
        setCount((prevState) => (prevState += 1));
        newArr[j].status = "progress";
        newArr[j + 1].status = "progress";

        setBars(() => {
          setBars(newArr);
        });
        await sleep(speedDict[speed]);
        if (stop) {
          setCanStart(true);
          break;
        }

        if (newArr[j].height > newArr[j + 1].height) {
          swap(newArr, j, j + 1);

          setBars(() => {
            setBars(newArr);
          });
          await sleep(speedDict[speed]);
        }
        newArr[j].status = "regular";
        newArr[j + 1].status = "regular";

        if (stop) {
          setCanStart(true);
          break;
        }

        if (j + 1 === n - i - 1) {
          newArr[j + 1].status = "finished";
        }

        setBars(() => {
          setBars(newArr);
        });
      }
    }
    if (!stop) newArr[0].status = "finished";
    stop = false;
    setCanStart(true);
  }

  async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = structuredClone(arr[l + i]);
    for (let j = 0; j < n2; j++) R[j] = structuredClone(arr[m + 1 + j]);

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    // const arr2 = structuredClone(arr);

    // console.log({ arr2 }, { L }, { R });

    while (i < n1 && j < n2) {
      setCount((prevState) => (prevState += 1));

      if (stop) {
        break;
      }

      arr[l + i].status = "progress";
      arr[m + 1 + j].status = "progress";
      setBars(() => {
        setBars(arr);
      });
      await sleep(speedDict[speed]);
      if (L[i]?.height <= R[j]?.height) {
        setBars(() => {
          setBars(arr);
        });
        await sleep(speedDict[speed]);
        arr[k] = L[i];
        i++;
        k++;
        console.log("a");
        let c = L.slice(i).concat(...R.slice(j));
        Array.prototype.splice.apply(arr, [k, c.length].concat(c));
      } else {
        arr[l + i].status = "min";
        arr[m + 1 + j].status = "min";
        setBars(() => {
          setBars(arr);
        });
        await sleep(speedDict[speed]);
        arr[k] = R[j];
        j++;
        k++;
        console.log("b");
        let c = L.slice(i).concat(...R.slice(j));
        Array.prototype.splice.apply(arr, [k, c.length].concat(c));
      }

      for (let c = 0; c < arr.length; c++) arr[c].status = "regular";
      setBars(() => {
        setBars(arr);
      });
      await sleep(speedDict[speed]);
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      if (stop) {
        break;
      }
      setCount((prevState) => (prevState += 1));
      if (k < arr.length) {
        console.log(k);
        arr[k] = L[i];
        console.log("c");
      }
      i++;
      k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      if (stop) {
        break;
      }
      if (k < arr.length) {
        console.log(k);
        arr[k] = R[j];
        console.log("d");
      }
      j++;
      k++;

      // let c = L.slice(i).concat(...R.slice(j))
      // Array.prototype.splice.apply(arr, [k, c.length].concat(c));
    }

    k++;
  }

  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  async function mergeSort(arr, l, r) {
    if (l >= r) {
      return; //returns recursively
    }
    var m = l + parseInt((r - l) / 2);

    if (stop) {
      return;
    }

    await mergeSort(arr, l, m);
    setBars(() => {
      setBars(arr);
    });
    await sleep(speedDict[speed]);
    if (stop) {
      return;
    }

    await mergeSort(arr, m + 1, r);
    setBars(() => {
      setBars(arr);
    });
    await sleep(speedDict[speed]);
    if (stop) {
      return;
    }

    await merge(arr, l, m, r);
    setBars(() => {
      setBars(arr);
    });
    await sleep(speedDict[speed]);
  }

  async function startSorting() {
    if (!canStart) {
      return;
    }
    setHasStarted(true);
    setCanStart(false);
    if (algo === "S") await selectionSort(bars);
    if (algo === "B") await bubbleSort(bars);
    if (algo === "I") await insertionSort(bars);
    if (algo === "M") {
      setCanStart(false);
      const newArr = structuredClone(bars);
      const newArr2 = [
        { height: 129.23, status: "regular" },
        { height: 246.06, status: "regular" },
        { height: 92.42, status: "regular" },
        { height: 33.07, status: "regular" },
        { height: 213.74, status: "regular" },
        { height: 240.82, status: "regular" },
        { height: 27.1, status: "regular" },
        { height: 55.45, status: "regular" },
        { height: 198.66, status: "regular" },
        { height: 151.85, status: "regular" },
      ];
      await mergeSort(newArr, 0, newArr.length - 1);
      if (!stop) {
        setCanStart(true);
      } else {
        stop = !stop;
        setCanStart(true);
      }
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="App">
          <Header
            sort={startSorting}
            generate={generateNewArrayHandler}
            speedHandler={setSpeedHandler}
            speed={speed}
            canPlay={canStart}
            stop={stopSortingHanlder}
            reset={resetArrayHandler}
            started={hasStarted}
            size={barsSize}
            algo={algo}
            setAlgo={setAlgoHandler}
          ></Header>
        </div>
        <div className={containerClass.div}>
          <BarContainer data={bars} />
        </div>
        <div className={containerClass.div3}>
          <div className={containerClass.div4}>
            <h1 style={{ color: "#1976d2", margin: "0 auto" }}>Array Size</h1>
            <h3 style={{ color: "#1976d2", margin: "0 auto" }}>
              {sizeDict[barsSize]}
            </h3>
          </div>
          <div className={containerClass.div4}>
            <h1 style={{ color: "#1976d2", margin: "0 auto" }}>Max Value</h1>
            <h3 style={{ color: "#1976d2", margin: "0 auto" }}>{maxVal}</h3>
          </div>
          <div className={containerClass.div4}>
            <h1 style={{ color: "#1976d2", margin: "0 auto" }}>Min Value</h1>
            <h3 style={{ color: "#1976d2", margin: "0 auto" }}>{minVal}</h3>
          </div>
        </div>
        <div className={containerClass.div2}>
          <h1 style={{ color: "#1976d2", margin: "0 auto" }}>Steps Count</h1>
          <h3 style={{ color: "#1976d2", margin: "0 auto" }}>{count}</h3>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
