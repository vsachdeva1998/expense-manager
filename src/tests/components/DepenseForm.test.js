import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DepenseForm from '../../components/DepenseForm';
import depenses from '../fixtures/depenses';

test('should render DepenseForm correctly', () => {
  const wrapper = shallow(<DepenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DepenseForm correctly with depense data', () => {
  const wrapper = shallow(<DepenseForm depense={depenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<DepenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value },
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note value';
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value },
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.122';
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value },
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <DepenseForm depense={depenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: depenses[0].description,
    amount: depenses[0].amount,
    note: depenses[0].note,
    createdAt: depenses[0].createdAt,
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calender focus on change', () => {
  const focused = true;
  const wrapper = shallow(<DepenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});
