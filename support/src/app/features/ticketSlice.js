import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticket: [],
    messages: [],
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        addTicket: (state, action) => {
            return{
                ...state,
                ticket: [...state.ticket, action.payload]
            }
        },
        setMessages: (state, action) => {
            localStorage.setItem('messages', JSON.stringify(action.payload));

            return {
              ...state,
              messages: action.payload,
            };
          
        },
        addMessages: (state, action) => {
            return {
                ...state,
                messages: action.payload
            }
        }
    }
});

export const {addTicket, setMessages, addMessages} = ticketSlice.actions;
export default ticketSlice.reducer;