import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import rootreducre from './reducer/index';
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
    key: 'shiyin',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootreducre)

// const configStore = preloadedState => {
//     return createStore(
//         rootreducre,
//         preloadedState
//     )
// };

// const Store = configStore();
// export default Store;

export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor}
}