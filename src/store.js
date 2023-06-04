import { createStore } from 'redux';
import rootReducer from './reducers';

// Create store
const store = createStore(rootReducer);

export default store;
