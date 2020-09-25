import React from 'react';
import { shallow } from 'enzyme';
import DepenseListItem from '../../components/DepenseListItem';
import depenses from '../fixtures/depenses';

test('should render DepenseListItem correctly', () => {
  const wrapper = shallow(<DepenseListItem {...depenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
