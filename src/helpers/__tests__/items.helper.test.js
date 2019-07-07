import { mapItems, filterItemsByString, filterItemsByKey } from '../items.helper';

const itemsEmpty = [];
const items = [{ name: 'test1', isSelected: false }, { name: 'test2', isSelected: false }];
const rawItems = ['test1', 'test2'];


describe('mapItems function tests', () => {
  it('format raw items', () => {
    const result = mapItems(rawItems);
    expect(result).toEqual(items);
  });
  it('format empty array items', () => {
    const result = mapItems(itemsEmpty);
    expect(result).toEqual(itemsEmpty);
  });
  it('format raw array items with already selected items passed', () => {
    const [selectedItem, ...NotSelectedItems] = items;
    const result = mapItems(rawItems, [selectedItem.name]);
    expect(result).toEqual([{ ...selectedItem, isSelected: true }, ...NotSelectedItems]);
  });
});

describe('filterItemsByString function tests', () => {
  it('filter items with no filter text passed', () => {
    const result = filterItemsByString(items);
    expect(result).toEqual(items);
  });
  it('filter items with filter text passed', () => {
    const [selectedItem] = items;
    const result = filterItemsByString(items, selectedItem.name);
    expect(result).toEqual([selectedItem]);
  });
  it('properly sorted items by key', () => {
    const [selectedItem, ...otherItems] = items;
    selectedItem.isSelected = true;
    const result = filterItemsByString([...otherItems, selectedItem], '', 'isSelected');
    expect(result[0]).toEqual(selectedItem);
  });
});

describe('filterItemsByKey function tests', () => {
  it('filter items by isSelected key', () => {
    const [selectedItem] = items;
    selectedItem.isSelected = true;
    const result = filterItemsByKey(items, 'isSelected');
    expect(result).toEqual([selectedItem]);
  });
});
