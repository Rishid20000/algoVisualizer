export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
  }
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push(["compare", i, endIdx]);
    animations.push(["revert", i, endIdx]);
    if (mainArray[i] < pivotValue) {
      animations.push(["swap", i, mainArray[pivotIdx]]);
      animations.push(["swap", pivotIdx, mainArray[i]]);
      [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
      pivotIdx++;
    }
  }
  animations.push(["swap", endIdx, mainArray[pivotIdx]]);
  animations.push(["swap", pivotIdx, mainArray[endIdx]]);
  [mainArray[endIdx], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[endIdx]];
  return pivotIdx;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const n = array.length;

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      animations.push(["compare", left, largest]);
      animations.push(["revert", left, largest]);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      animations.push(["compare", right, largest]);
      animations.push(["revert", right, largest]);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      animations.push(["swap", i, arr[largest]]);
      animations.push(["swap", largest, arr[i]]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push(["swap", 0, array[i]]);
    animations.push(["swap", i, array[0]]);
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0);
  }

  return animations;
}
