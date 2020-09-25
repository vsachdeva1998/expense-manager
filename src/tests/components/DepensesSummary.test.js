import React from 'react';
import { shallow } from 'enzyme';
import { DepensesSummary } from '../../components/DepensesSummary';

test('should correctly render DepensesSummary with 1 depense', () => {
  const wrapper = shallow(
    <DepensesSummary depenseCount={1} depensesTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render DepensesSummary with multiple depenses', () => {
  const wrapper = shallow(
    <DepensesSummary depenseCount={23} depensesTotal={23512340987} />
  );
  expect(wrapper).toMatchSnapshot();
});
