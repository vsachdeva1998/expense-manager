import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddDepense,
  addDepense,
  editDepense,
  removeDepense,
  setDepenses,
  startSetDepenses,
  startRemoveDepense,
  startEditDepense,
} from '../../actions/depenses';
import depenses from '../fixtures/depenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(async () => {
  const depensesData = {};
  depenses.forEach(({ id, description, note, amount, createdAt }) => {
    depensesData[id] = { description, note, amount, createdAt };
  });
  await database.ref(`users/${uid}/depenses`).set(depensesData);
});

afterAll(() => {
  database.goOffline();
});

test('should setup remove depense action object', () => {
  const action = removeDepense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_DEPENSE',
    id: '123abc',
  });
});

test('should remove depense from firebase', async () => {
  const store = createMockStore(defaultAuthState);
  const id = depenses[2].id;
  await store.dispatch(startRemoveDepense({ id }));

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'REMOVE_DEPENSE',
    id,
  });
  const snapshot = await database
    .ref(`users/${uid}/depenses/${id}`)
    .once('value');
  expect(snapshot.val()).toBeFalsy();
});

test('should setup edit depense action object', () => {
  const action = editDepense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_DEPENSE',
    id: '123abc',
    updates: {
      note: 'New note value',
    },
  });
});

test('should edit depense from firebase', async () => {
  const store = createMockStore(defaultAuthState);
  const id = depenses[0].id;
  const updates = { amount: 21045 };
  await store.dispatch(startEditDepense(id, updates));

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'EDIT_DEPENSE',
    id,
    updates,
  });
  const snapshot = await database
    .ref(`users/${uid}/depenses/${id}`)
    .once('value');
  expect(snapshot.val().amount).toBe(updates.amount);
});

test('should setup add depense action object with provided values', () => {
  const action = addDepense(depenses[2]);
  expect(action).toEqual({
    type: 'ADD_DEPENSE',
    depense: depenses[2],
  });
});

test('should add depense to database and store', async () => {
  const store = createMockStore(defaultAuthState);
  const depenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000,
  };
  await store.dispatch(startAddDepense(depenseData));

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_DEPENSE',
    depense: {
      id: expect.any(String),
      ...depenseData,
    },
  });
  const snapshot = await database
    .ref(`users/${uid}/depenses/${actions[0].depense.id}`)
    .once('value');

  expect(snapshot.val()).toEqual(depenseData);
});

test('should add depense with defaults to database and store', async () => {
  const store = createMockStore(defaultAuthState);
  const depenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0,
  };
  await store.dispatch(startAddDepense());

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_DEPENSE',
    depense: {
      id: expect.any(String),
      ...depenseDefaults,
    },
  });
  const snapshot = await database
    .ref(`users/${uid}/depenses/${actions[0].depense.id}`)
    .once('value');

  expect(snapshot.val()).toEqual(depenseDefaults);
});

test('should setup set depenses action object with data', () => {
  const action = setDepenses(depenses);

  expect(action).toEqual({
    type: 'SET_DEPENSES',
    depenses,
  });
});

test('should fetch the depenses from the firebase', async () => {
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startSetDepenses());

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_DEPENSES',
    depenses,
  });
});
