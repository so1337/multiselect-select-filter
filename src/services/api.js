import items from './items.json';

// because we have data locally which is not really usual, let's simulate GET request with promise
const getItems = async () => items.data;

export {
  getItems,
};
