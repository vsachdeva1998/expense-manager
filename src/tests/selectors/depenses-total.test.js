import selectDepensesTotal from '../../selectors/depenses-total';
import depenses from '../fixtures/depenses';

test('should return 0 if no depenses', () => {
  const res = selectDepensesTotal([]);
  expect(res).toBe(0);
});

test('should correctly add up a single depense', () => {
  const res = selectDepensesTotal([depenses[0]]);
  expect(res).toBe(195);
});

test('should correctly add up multiple depense', () => {
  const res = selectDepensesTotal(depenses);
  expect(res).toBe(114195);
});
