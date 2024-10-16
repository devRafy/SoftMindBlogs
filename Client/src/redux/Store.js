import { configureStore , combineReducers} from '@reduxjs/toolkit';
import userSlice from "./Users/UsersSlice.js"
import authReducer from "./Users/AuthSlice.js"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';



const rootReducer = combineReducers({
   user:userSlice,
   auth: authReducer,
});

const  persistConfig = {
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        reducer : persistedReducer,
    },
});


export const persistor = persistStore(store);