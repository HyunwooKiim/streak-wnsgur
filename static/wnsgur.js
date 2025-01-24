export function wnsgur(input) {
    const randomPrefix = Math.random().toString(36).substring(2, 5);
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const modifiedInput = randomPrefix + input + randomSuffix;
    const cleanedInput = modifiedInput.substring(3, modifiedInput.length - 3);
    return atob(cleanedInput);
}