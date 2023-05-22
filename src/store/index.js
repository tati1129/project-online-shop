import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productsSlice from './slice/productsSlice'
import categoriesSlice from './slice/categoriesSlice'
import  basketSlice  from './slice/basketSlice'
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER  } from 'redux-persist'
import storage  from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    products: productsSlice,
    categories: categoriesSlice,
    basket: basketSlice
})

const persistConfig = {
    key: 'root',
    storage
}


const persistedReduser = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReduser,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
})
export const persistor = persistStore(store);
export default store;






/* import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slice/productsSlice'
import categoriesSlice from './slice/categoriesSlice'
import  basketSlice  from './slice/basketSlice'


export const store = configureStore({
    reducer: {
        products: productsSlice,
        categories: categoriesSlice,
        basket: basketSlice
    }
  
}) */