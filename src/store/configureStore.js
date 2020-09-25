import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import depensesReducer from '../reducers/depenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

export default () => {
  const store = createStore(
    combineReducers({
      depenses: depensesReducer,
      filters: filtersReducer,
      auth: authReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
