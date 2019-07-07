
import React from 'react';
import PropTypes from 'prop-types';

function Item({
  label, checked, onSelect,
}) {
  let toggleClassName;
  let checkboxHiddenClassName;
  if (checked === undefined) {
    checkboxHiddenClassName = 'hidden';
  } else {
    toggleClassName = `${checked ? 'selected' : ''}`;
  }
  return (
    <li className={['item', toggleClassName].join(' ')}>
      <input
        className={['item-checkbox', checkboxHiddenClassName].join(' ')}
        onChange={() => { onSelect(label); }}
        checked={checked}
        id={`label-id-${label}`}
        type="checkbox"
      />
      <label className="label" htmlFor={`label-id-${label}`}>{label}</label>
    </li>
  );
}
Item.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  checked: undefined,
  onSelect: () => {},
};

export default Item;
