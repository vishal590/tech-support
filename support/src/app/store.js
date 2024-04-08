import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {authSlice} from "./features/authSlice";
import { ticketSlice } from "./features/ticketSlice";

const persistConfig = {
    key: 'root',
    storage,
}

// const persistAuthReducer = persistReducer(persistConfig, authSlice.reducer )
// const persistedTicketReducer = persistReducer(persistConfig, ticketSlice.reducer);

const persistRootReducer = persistReducer(persistConfig, combineReducers({auth: authSlice.reducer, tickets: ticketSlice.reducer}) )

export const store = configureStore({
    reducer: persistRootReducer
})

export const persistor = persistStore(store);