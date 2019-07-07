import React from 'react';
import PropTypes from 'prop-types';

const FilterInput = ({ onChange, defaultValue, icon }) => (
  <div className="filter-block">
    <input
      className="filter-input"
      defaultValue={defaultValue}
      placeholder="Zoek op..."
      onBlur={(event) => { onChange(event.target.value); }}
      onChange={(event) => { onChange(event.target.value); }}
    />
    {icon && (<img src={icon} className="icon" alt="filter icon" />)}
  </div>
);

FilterInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  icon: PropTypes.string,
};

FilterInput.defaultProps = {
  defaultValue: '',
  icon: null,
};

export default FilterInput;
