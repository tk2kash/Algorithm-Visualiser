function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1){
        return animations; 
    }
    // Use a copy for sorting
    const auxiliaryArray = array.slice();
    const workingArray = array.slice();
    mergeSortHelper(workingArray, 0, workingArray.length - 1, auxiliaryArray, animations);
    return animations;
}
function mergeSortHelper(array, start, end, auxiliaryArray, animations){
    if(start === end){
        return;
    }
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(array, start, mid, auxiliaryArray, animations);
    mergeSortHelper(array, mid + 1, end, auxiliaryArray, animations);
    merge(array, start, mid, end, auxiliaryArray, animations);
}
function merge(array, start, mid, end, auxiliaryArray, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
        animations.push(["compare", i, j]);
        if (auxiliaryArray[i] < auxiliaryArray[j]) {
            animations.push(["swap", k, auxiliaryArray[i]]);
            array[k++] = auxiliaryArray[i++];
        } else {
            animations.push(["swap", k, auxiliaryArray[j]]);
            array[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= mid) {
        animations.push(["compare", i, i]);
        animations.push(["swap", k, auxiliaryArray[i]]);
        array[k++] = auxiliaryArray[i++];
    }
    while (j <= end) {
        animations.push(["compare", j, j]);
        animations.push(["swap", k, auxiliaryArray[j]]);
        array[k++] = auxiliaryArray[j++];
    }
    //Copy sorted segment back to auxiliaryArray
    for (let idx = start; idx <= end; idx++) {
        auxiliaryArray[idx] = array[idx];
    }
}
export default getMergeSortAnimations;