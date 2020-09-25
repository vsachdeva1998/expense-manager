import { createStore, combineReducers } from 'redux';
const { v4: uuidv4 } = require('uuid');

// ADD_DEPENSE
const addDepense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: 'ADD_DEPENSE',
  depense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_DEPENSE
const removeDepense = ({ id } = {}) => ({
  type: 'REMOVE_DEPENSE',
  id,
});

// EDIT_DEPENSE
const editDepense = (id, updates) => ({
  type: 'EDIT_DEPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate,
});

// Depenses Reducer
const depensesReducerDefaultState = [];

const depensesReducer = (state = depensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_DEPENSE':
      return [...state, action.depense];
    case 'REMOVE_DEPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_DEPENSE':
      return state.map((depense) => {
        if (depense.id === action.id) {
          return {
            ...depense,
            ...action.updates,
          };
        } else {
          return depense;
        }
      });
    default:
      return state;
  }
};

// Filters Depense
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get visible depenses
const getVisibleDepenses = (depenses, { text, sortBy, startDate, endDate }) => {
  return depenses
    .filter((depense) => {
      const startDateMatch =
        typeof startDate === 'undefined' ||
        (typeof startDate === 'number' && depense.createdAt >= startDate);
      const endDateMatch =
        typeof endDate === 'undefined' ||
        (typeof startDate === 'number' && depense.createdAt <= endDate);
      const textMatch = depense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation
const store = createStore(
  combineReducers({
    depenses: depensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleDepenses = getVisibleDepenses(state.depenses, state.filters);
  console.log(visibleDepenses);
});

const depenseOne = store.dispatch(
  addDepense({ description: 'Rent', amount: 100, createdAt: 1000 })
);
const depenseTwo = store.dispatch(
  addDepense({ description: 'Coffee', amount: 300, createdAt: 2000 })
);

// store.dispatch(removeDepense({ id: depenseOne.depense.id }));
// store.dispatch(editDepense(depenseTwo.depense.id, { amount: 500 }));

// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0)); // startDate 125
// store.dispatch(setStartDate()); // startDate undefined
// store.dispatch(setEndDate(999)); // endDate 1250

const exampleState = {
  depenses: [
    {
      id: 'poijasdfhwer',
      description: 'January Rent',
      note: 'This was the final payment for that address',
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'data',
    startDate: undefined,
    endDate: undefined,
  },
};
