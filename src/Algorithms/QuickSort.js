function quickSort(arr, low, high, animations) {
    if (low < high) {
        const pi = partition(arr, low, high, animations);
        quickSort(arr, low, pi - 1, animations);
        quickSort(arr, pi + 1, high, animations);
    }
    return animations;
}

function partition(arr, low, high, animations) {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
        animations.push(["compare", j, high]); // Highlight comparison
        if (arr[j] < pivot) {
            // Overwrite animation: swap arr[i] and arr[j]
            animations.push(["overwrite", i, arr[j]]);
            animations.push(["overwrite", j, arr[i]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    // Final pivot swap
    animations.push(["overwrite", i, arr[high]]);
    animations.push(["overwrite", high, arr[i]]);
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}

export default quickSort;
