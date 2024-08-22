import React from 'react';
import { getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const ANIMATION_SPEED_MS = 1; // Define animation speed here

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  async mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }
    }
  }

  async quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];
      const isColorChange = action === "compare" || action === "revert";
      if (isColorChange) {
        const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
      } else {
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
      }
    }
  }

  async heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barTwoIdxOrHeight] = animations[i];
      const isColorChange = action === "compare" || action === "revert";
      if (isColorChange) {
        const color = action === "compare" ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        arrayBars[barOneIdx].style.backgroundColor = color;
        arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
      } else {
        await this.timeoutPromise(ANIMATION_SPEED_MS);
        arrayBars[barOneIdx].style.height = `${barTwoIdxOrHeight}px`;
      }
    }
  }

  bubbleSort() {
    const arr = this.state.array.slice();
    const animations = [];
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 1; i < n; i++) {
        animations.push(["compare", i - 1, i]);
        if (arr[i - 1] > arr[i]) {
          animations.push(["swap", i - 1, arr[i], i, arr[i - 1]]);
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          swapped = true;
        }
        animations.push(["revert", i - 1, i]);
      }
      n--;
    } while (swapped);
    this.animateSorting(animations, arr);
  }

  animateSorting(animations, sortedArray) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [action, barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      switch (action) {
        case "compare":
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          break;
        case "swap":
          setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
          break;
        case "revert":
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          break;
        default:
          break;
      }
    }
    setTimeout(() => {
      this.setState({ array: sortedArray });
    }, animations.length * ANIMATION_SPEED_MS);
  }

  timeoutPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  testSortingAlgorithms() {
    // Function to test sorting algorithms against JavaScript's built-in sort
    // Not needed for regular functionality
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
          ></div>
        ))}
        
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
       
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
