import React from 'react';
import { shallow } from 'enzyme';
import { AddDepensePage } from '../../components/AddDepensePage';
import depenses from '../fixtures/depenses';

let startAddDepense, history, wrapper;

beforeEach(() => {
  startAddDepense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddDepensePage startAddDepense={startAddDepense} history={history} />
  );
});

test('should render AddDepensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('DepenseForm').prop('onSubmit')(depenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startAddDepense).toHaveBeenLastCalledWith(depenses[1]);
});
