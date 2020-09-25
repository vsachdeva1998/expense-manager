import moment from 'moment';
import selectDepenses from '../../selectors/depenses';
import depenses from '../fixtures/depenses';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectDepenses(depenses, filters);
  expect(result).toEqual([depenses[2], depenses[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined,
  };

  const result = selectDepenses(depenses, filters);
  expect(result).toEqual([depenses[2], depenses[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0),
  };

  const result = selectDepenses(depenses, filters);
  expect(result).toEqual([depenses[0], depenses[1]]);
});

test('should sort by Date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectDepenses(depenses, filters);
  expect(result).toEqual([depenses[2], depenses[0], depenses[1]]);
});

test('should sort by Amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectDepenses(depenses, filters);
  expect(result).toEqual([depenses[1], depenses[2], depenses[0]]);
});
