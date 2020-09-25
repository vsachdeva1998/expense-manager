import authReducer from '../../reducers/auth';

test('should setup defaut state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: '123ab',
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const state = authReducer({ uid: '123ab' }, { type: 'LOGOUT' });
  expect(state).toEqual({});
});
