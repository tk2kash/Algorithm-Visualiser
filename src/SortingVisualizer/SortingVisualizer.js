import { useState, useEffect } from "react";
import getMergeSortAnimations from "../Algorithms/MergeSort";
import bubbleSort from "../Algorithms/BubbleSort"; 
import quickSort from "../Algorithms/QuickSort";


function randomArray(size, min = 10, max = 800) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

function SortingVisualizer(){
    const [array, setArray] = useState([]);
    const [barColors, setBarColors] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    useEffect(() => {
        setBarColors(new Array(array.length).fill("blue"));
    }, [array]);

    const resetArray = () => {
        const newArray = randomArray(200);
        setArray(newArray);
    };

    const handleMergeSort = () => {
        const animations = getMergeSortAnimations(array.slice());
        sortingAnimations(animations);

    };

    const handleBubbleSort = () => {
        const animations = [];
        const arr = array.slice();
        bubbleSort(arr, animations);
        sortingAnimations(animations);

    };

    const handleQuickSort = () => {
        const animations = [];
        const arr = array.slice(); 
        quickSort(arr, 0, arr.length - 1, animations);
        sortingAnimations(animations);
    };





    const sortingAnimations = (animations) =>{
        let arr = array.slice(); // local copy
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [type, idx1, idx2] = animations[i];
                if (type === "compare") {
                    setBarColors(prev => {
                        const newColors = prev.slice();
                        newColors[idx1] = "red";
                        newColors[idx2] = "red";
                        return newColors;
                    });
                    setTimeout(() => {
                        setBarColors(prev => {
                            const newColors = prev.slice();
                            newColors[idx1] = "blue";
                            newColors[idx2] = "blue";
                            return newColors;
                        });
                    }, 50);
                } else if (type === "swap" || type === "overwrite") {
                    arr[idx1] = idx2;
                    setArray(arr.slice());
                }

                if (i === animations.length - 1) {
                    setTimeout(() => {
                        console.log("Is sorted:", isSorted(arr));
                    }, 20);
                }
            }, i * 10);
        }

    };

    return(
        <div>
            <button onClick={resetArray} style={{ marginBottom: "20px" }}>
                Generate New Array
            </button>
            <button onClick={handleMergeSort} style={{ marginLeft: "20px" }}>
                Merge Sort
            </button>
            <button onClick={handleBubbleSort} style={{ marginLeft: "20px" }}>
                Bubble Sort
            </button>
            <button onClick={handleQuickSort} style={{ marginLeft: "20px" }}>
                Quick Sort
            </button>

            <div style={{ display: "flex", alignItems: "flex-end", height: "850px" }}>

                {array.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            height: `${value}px`,
                            width: "5px",
                            backgroundColor: barColors[index] || "blue",
                            margin: "1px"
                        }}
                    />
                ))}
            </div>
            
        </div>

    );

}

export default SortingVisualizer;