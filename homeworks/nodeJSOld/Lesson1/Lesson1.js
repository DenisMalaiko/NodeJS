const sum = (arr) => {
    let count = 0;

    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            count += sum(arr[i]);
        } else {
            count += arr[i];
        }
    }

    return count;
}

const result = sum([1, 2, [3, 4, [5]], 6]);

console.log("RESULT ", result);