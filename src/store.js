import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

export default store;