// map raw items into formatted array
const mapItems = (items = [], selectedList = []) => (
  items.length
    ? items.map(item => (
      {
        name: item,
        isSelected: Array.isArray(selectedList)
          ? (selectedList.indexOf(item.toLowerCase()) !== -1)
          : false,
      }))
    : []
);

// filter list by string passed and also sort it by key if passed.
const filterItemsByString = (items = [], filter = '', sortBy = false) => {
  const filteredItems = items.filter(
    item => item.isSelected
    || (item.name && item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1),
  );

  if (sortBy) {
    filteredItems.sort((item1, item2) => Number(item2[sortBy]) - Number(item1[sortBy]));
  }
  return filteredItems;
};

// filter items list by key
const filterItemsByKey = (items = [], selector = 'isSelected') => items.filter(item => item[selector]);

export { mapItems, filterItemsByString, filterItemsByKey };
