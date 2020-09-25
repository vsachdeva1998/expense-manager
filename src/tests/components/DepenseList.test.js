import React from 'react';
import { shallow } from 'enzyme';
import { DepenseList } from '../../components/DepenseList';
import depenses from '../fixtures/depenses';

test('should render DepenseList with depenses', () => {
  const wrapper = shallow(<DepenseList depenses={depenses} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DepenseList with empty message', () => {
  const wrapper = shallow(<DepenseList depenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
