// arrayManager.js
import dotenv from 'dotenv';
dotenv.config();

const array = [];

export const getMaxArrayLength = () => parseInt(process.env.CACHE_ARRAY_LENGTH, 10);

export const getArray = () => {
    return [...array];  // Return a copy to prevent direct manipulation
};

export const addItem = (item) => {
    if (array.length >= getMaxArrayLength()) {
        array.shift();  // Remove the oldest item
    }
    array.push(item);  // Add the new item
};

export const mean = () => {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, val) => acc + val, 0);
    return sum / array.length;
};

export const median = () => {
    if (array.length === 0) return 0;
    const sortedArray = [...array].sort((a, b) => a - b);
    const mid = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 !== 0) {
        return sortedArray[mid];
    } else {
        return (sortedArray[mid - 1] + sortedArray[mid]) / 2;
    }
};

export default {
    getArray,
    addItem,
    mean,
    median,
    getMaxArrayLength
};
