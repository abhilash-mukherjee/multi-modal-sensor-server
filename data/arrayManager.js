// arrayManager.js
import dotenv from 'dotenv';
dotenv.config();

const arrays = {};

export const getMaxArrayLength = () => parseInt(process.env.CACHE_ARRAY_LENGTH, 10);

export const getArray = (key) => {
    if (!arrays[key]) {
        arrays[key] = [];  // Initialize if not already present
    }
    return [...arrays[key]];  // Return a copy to prevent direct manipulation
};

export const addItem = (item, key) => {
    if (!arrays[key]) {
        arrays[key] = [];  // Initialize if not already present
    }
    if (arrays[key].length >= getMaxArrayLength()) {
        arrays[key].shift();  // Remove the oldest item
    }
    arrays[key].push(item);  // Add the new item
    console.log(arrays[key]);
};

export const mean = (key) => {
    if (!arrays[key] || arrays[key].length === 0) return 0;
    const sum = arrays[key].reduce((acc, val) => acc + val, 0);
    return sum / arrays[key].length;
};

export const median = (key) => {
    if (!arrays[key] || arrays[key].length === 0) return 0;
    const sortedArray = [...arrays[key]].sort((a, b) => a - b);
    const mid = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 !== 0) {
        return sortedArray[mid];
    } else {
        return (sortedArray[mid - 1] + sortedArray[mid]) / 2;
    }
};

export const isFull = (key) => {
    if (!arrays[key] || arrays[key].length === 0) return false;
    if(arrays[key].length < getMaxArrayLength()) return false;
    return true;
}

export default {
    getArray,
    addItem,
    mean,
    median,
    getMaxArrayLength,
    isFull
};
