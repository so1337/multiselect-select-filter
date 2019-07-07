import React from 'react';
import { shallow } from 'enzyme';
import Item from '../Item';

const label = 'test';
const hiddenClass = 'hidden';
const highlightClass = 'selected';
describe('basic rendering tests', () => {
  it('renders without crashing with required props', () => {
    shallow(<Item label={label} />);
  });

  it('renders without crashing with all props', () => {
    shallow(<Item label={label} checked onSelect={() => {}} />);
  });
});
describe('styling tests', () => {
  it('checkbox hidden if "checked" prop not passed', () => {
    const element = shallow(<Item label={label} />);
    expect(element.find('input').hasClass(hiddenClass)).toEqual(true);
  });
  it('checkbox visible if "checked" prop passed', () => {
    const element = shallow(<Item label={label} checked />);
    expect(element.find('input').hasClass(hiddenClass)).toEqual(false);
  });
  it('item has highlight class if "checked" prop is true', () => {
    const element = shallow(<Item label={label} checked />);
    expect(element.find('li').hasClass(highlightClass)).toEqual(true);
  });
  it('item has no highlight class if "checked" prop is false', () => {
    const element = shallow(<Item label={label} />);
    expect(element.find('li').hasClass(highlightClass)).toEqual(false);
  });
  it('proper label text rendered', () => {
    const element = shallow(<Item label={label} />);
    expect(element.find('label').text()).toEqual(label);
  });
});
describe('event triggering tests', () => {
  it('onSelect prop is called when fired "change" event on checkbox', () => {
    let check;
    const onSelect = () => {
      check = true;
    };

    const element = shallow(<Item label={label} onSelect={onSelect} checked />);
    element.find('input').simulate('change');
    expect(check).toEqual(true);
  });
  it('onSelect passed proper response hen fired "change" event on checkbox', () => {
    let check;
    const onSelect = (dataFromEvent) => {
      check = dataFromEvent;
    };

    const element = shallow(<Item label={label} onSelect={onSelect} checked />);
    element.find('input').simulate('change');
    expect(check).toEqual(label);
  });
});
