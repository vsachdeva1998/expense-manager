import depensesReducer from '../../reducers/depenses';
import depenses from '../fixtures/depenses';

test('should setup defaut state', () => {
  const state = depensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove depense by id', () => {
  const action = {
    type: 'REMOVE_DEPENSE',
    id: depenses[1].id,
  };
  const state = depensesReducer(depenses, action);
  expect(state).toEqual([depenses[0], depenses[2]]);
});

test('should not remove depense if id not found', () => {
  const action = {
    type: 'REMOVE_DEPENSE',
    id: '-1',
  };
  const state = depensesReducer(depenses, action);
  expect(state).toEqual(depenses);
});

test('should add an depense', () => {
  const depense = {
    id: '109',
    description: 'Laptop',
    note: '',
    amount: 29500,
    createdAt: 20000,
  };
  const action = {
    type: 'ADD_DEPENSE',
    depense,
  };
  const state = depensesReducer(depenses, action);
  expect(state).toEqual([...depenses, depense]);
});

test('should edit an depense', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_DEPENSE',
    id: depenses[1].id,
    updates: {
      amount,
    },
  };
  const state = depensesReducer(depenses, action);
  expect(state[1].amount).toEqual(amount);
});

test('should not edit an depense if id not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT_DEPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = depensesReducer(depenses, action);
  expect(state).toEqual(depenses);
});

test('should set depenses', () => {
  const action = {
    type: 'SET_DEPENSES',
    depenses: [depenses[1]],
  };
  const state = depensesReducer(depenses, action);
  expect(state).toEqual([depenses[1]]);
});
