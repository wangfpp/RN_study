import { createStore, applyMiddleware, compose } from 'redux';
import rootreducre from './reducer/setip';

const configStore = preloadedState => {
    return createStore(
        rootreducre,
        preloadedState
    )
};

const Store = configStore();
export default Store;