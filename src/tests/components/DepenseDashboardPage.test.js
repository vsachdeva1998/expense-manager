import React from 'react';
import { shallow } from 'enzyme';
import DepenseDashboardPage from '../../components/DepenseDashboardPage';

test('should render DepenseDashboardPage correctly', () => {
  const wrapper = shallow(<DepenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
