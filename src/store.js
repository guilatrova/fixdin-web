import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

// const store = createStore(
//   rootReducer,  
//   applyMiddleware(thunk)
// );

const store = createStore(
  rootReducer,
    compose(
      applyMiddleware(thunk),
      (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
    )
);

export default store;