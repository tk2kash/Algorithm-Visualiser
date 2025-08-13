function bubbleSort(array, animations) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push(["compare", j, j + 1]);
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                animations.push(["swap", j, array[j]]);
                animations.push(["swap", j + 1, array[j + 1]]);
            }
        }
    }
    // Final pass to ensure the last element is in place
    animations.push(["compare", n - 2, n - 1]);
    if (array[n - 2] > array[n - 1]) {
        animations.push(["swap", n - 2, array[n - 1]]);
        animations.push(["swap", n - 1, array[n - 2]]);
    }

    return animations;
}


export default bubbleSort;