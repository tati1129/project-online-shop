import {  createSlice } from "@reduxjs/toolkit";



export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        list: [], 
        
    },
    reducers: {
        add_basket : (state, {payload}) => {
            const target = state.list.find(({id}) => id === payload)
            if (target === undefined){
                state.list = [...state.list, {id: payload, count:1 }]
            }else{
                target.count++
            }
        
        },
        increment_basket: (state, {payload}) => {
            const basket = state.list.find(({id}) => id === payload)
            basket.count++
            
        },
        decrement_basket: (state, {payload}) => {
            const basket = state.list.find(({id}) => id === payload)
            basket.count === 1 ? state.list = state.list.filter(({id}) => id !== payload) : basket.count--

        },
        remove_basket: (state, {payload}) => {
            state.list = state.list.filter(({id}) => id !== payload)
        },
        clear_basket: (state, {payload}) =>{
            state.list = []
        }
       
    }
})

export const { add_basket, increment_basket, decrement_basket, remove_basket, clear_basket} = basketSlice.actions;
export default basketSlice.reducer;