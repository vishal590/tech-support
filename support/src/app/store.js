import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {authSlice} from "./features/authSlice";
import { ticketSlice } from "./features/ticketSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const persistAuthReducer = persistReducer(persistConfig, authSlice.reducer )
const persistedTicketReducer = persistReducer(persistConfig, ticketSlice.reducer);


export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        tickets: persistedTicketReducer,
    }
})

export const persistor = persistStore(store);