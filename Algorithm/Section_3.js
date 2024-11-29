function findCombinations(l, t) {
    const result = []; 

    for (let i = 1; i <= 9; i++) {
        for (let j = i + 1; j <= 9; j++) {
            for (let k = j + 1; k <= 9; k++) {
                // Check if the length of combination same as l and the sum is same as t
                if (l === 3 && i + j + k === t) {
                    result.push([i, j, k]);
                }
            }
        }
    }

    return result;
}

// Example usage
console.log(findCombinations(3, 6)); // Output: [[1, 2, 3]]
console.log(findCombinations(3, 8)); // Output: [[1, 2, 5], [1, 3, 4]]
console.log(findCombinations(4, 5)); // Output: []