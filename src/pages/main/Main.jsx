import React, { useState, useEffect } from 'react';
import { getItems } from '../../services/api';
import { mapItems, filterItemsByString, filterItemsByKey } from '../../helpers/items.helper';
import List from '../../components/list/List';
import FilterInput from '../../components/filter/FilterInput';
import searchIcon from '../../assets/search.svg';

function Main() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const selectorKey = 'isSelected';

  async function fetchData(selectedList) {
    try {
      const data = await getItems();
      setItems(mapItems(data, selectedList));
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  // handle item selecting
  function onSelect(name) {
    const [...clonedItems] = items;
    const itemIndex = clonedItems.findIndex(item => item.name === name);
    // if item name present - update item and list, also add it to local storage.
    if (itemIndex !== -1) {
      clonedItems[itemIndex].isSelected = !clonedItems[itemIndex].isSelected;
      setItems(clonedItems);
      const selectedItems = filterItemsByKey(clonedItems, selectorKey)
        .map(item => item.name.toLowerCase());
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }
  }

  // handle filter input change
  function onFilterChange(filterText) {
    console.log(filterText);
    setFilter(filterText);
    localStorage.setItem('filter', filterText);
  }
  // fetch data on mounting
  useEffect(() => {
    // get filter from local storage
    const filterText = localStorage.getItem('filter');
    setFilter(filterText);
    try {
      // get selected items array from local storage
      const selectedListRaw = localStorage.getItem('selectedItems');
      const selectedList = JSON.parse(selectedListRaw);
      // fetch data from api
      fetchData(selectedList);
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }, []);

  /* to properly render items in list with html entity in name
   * "dangerouslySetInnerHTML" could be used - but it's potential problems with security.
   * also searching them by "&" and "; signs could end up screwing up names with this symbols in it
   * so the best way is not to send strings with html entities from backend
   * and add them on frontend side
   */
  return (
    <div className="container">
      <h1 className="title">Productgroep</h1>
      <FilterInput
        onChange={onFilterChange}
        defaultValue={filter}
        icon={searchIcon}
      />
      <List
        items={filterItemsByString(items, filter, selectorKey)}
        onSelect={onSelect}
      />
      <button className="submit-button">Toepassen</button>
    </div>
  );
}

export default Main;
