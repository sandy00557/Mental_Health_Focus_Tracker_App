import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import preferenceReducer from "./preferenceSlice";  
/*The Redux store is the core of Redux. It’s where:

All your state lives

All your reducers run

All your dispatched actions go

Subscriptions and middleware (like Thunk) operate


*/
const store=configureStore({
    reducer:{
        user:userReducer,
        preferences:preferenceReducer, //because we gave the names a preferences there so we should put like preferences:
    }
})

export default store;