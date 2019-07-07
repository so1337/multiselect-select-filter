import React from 'react';
import { shallow } from 'enzyme';
import FilteredInput from '../FilterInput';

const defaultValue = 'test';
const emptyDefaultValue = '';
describe('basic rendering tests', () => {
  it('renders without crashing with required props', () => {
    shallow(<FilteredInput onChange={() => {}} />);
  });

  it('renders without crashing with all props', () => {
    shallow(<FilteredInput onChange={() => {}} defaultValue={defaultValue} />);
  });
});

describe('input rendering test', () => {
  it('renders proper defaultValue when passed empty default value', () => {
    const element = shallow(<FilteredInput onChange={() => {}} defaultValue={emptyDefaultValue} />);
    expect(element.find('input').props().defaultValue).toEqual(emptyDefaultValue);
  });
  it('renders proper defaultValue when passed proper default value', () => {
    const element = shallow(<FilteredInput onChange={() => {}} defaultValue={defaultValue} />);
    expect(element.find('input').props().defaultValue).toEqual(defaultValue);
  });
});

describe('event triggering tests', () => {
  it('onChange prop is called when fired "change" event on input', () => {
    let check;
    const onChange = () => {
      check = true;
    };
    const mockedEvent = { target: {} };
    const element = shallow(<FilteredInput onChange={onChange} />);
    element.find('input').simulate('change', mockedEvent);
    expect(check).toEqual(true);
  });
});
