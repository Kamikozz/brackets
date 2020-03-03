/**
 * Returns the index of found open & close pair brackets or false
 * @param {Array} arr array open & close pair brackets [['(',')'], ['[',']']]
 * @param {string} item bracket needed to be found
 * @param {boolean} isCloseBracket open or close bracket [0] or [1] index
 * @returns {(number|boolean)} index of found open & close brackets or false
 */
function checkIfExists(arr, item, isCloseBracket) {
    const POSITION = Number(isCloseBracket);
    for (let i = 0; i < arr.length; i++)
        if (arr[i][POSITION] === item)
            return arr[i];
    return false;
}

module.exports = function check(str, bracketsConfig) {
    let stack = [];
    for (let i = 0; i < str.length; i++) {
        // 1. check if this item is open bracket
        let foundItem = checkIfExists(bracketsConfig, str[i], false);
        if (foundItem) {
            // yes: 5. check if open & close brackets are equal
            if (foundItem[0] === foundItem[1]) {
                // they are equal:
                if (stack.length) {
                    // 6. if last item in stack is equal to foundItem bracket
                    if (stack[stack.length - 1] === str[i]) {
                        // found open & close brackets -> must be deleted
                        stack.pop();
                    } else {
                        // just push open or close bracket into stack
                        stack.push(foundItem[0]);
                    }
                } else {
                    // just push open or close bracket into stack
                    stack.push(foundItem[0]);
                }
            } else {
                // they are different: push close bracket into stack
                stack.push(foundItem[1]);
            }
        } else {
            // no: 2. check if this item is close bracket
            foundItem = checkIfExists(bracketsConfig, str[i], true);
            if (foundItem) {
                // it's close bracket:
                // 3. if there is no open brackets before -> false
                if (!stack.length) return false;
                // 4. pop last item from stack & check if they are not equal
                if (str[i] !== stack.pop()) return false;
            } else {
                // neither open nor close bracket
                return false;
            }
        }
    }

    if (stack.length) return false;
    return true;
}
