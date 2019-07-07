import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';


const List = ({ items, onSelect }) => (
  <div className="listContainer">
    <ul className="list">
      {items.map(item => (<Item key={item.name} label={item.name} checked={item.isSelected} onSelect={onSelect} />))}
    </ul>
  </div>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    isSelected: PropTypes.bool,
  })),
  onSelect: PropTypes.func,
};

List.defaultProps = {
  items: [],
  onSelect: () => {},
};


export default List;
