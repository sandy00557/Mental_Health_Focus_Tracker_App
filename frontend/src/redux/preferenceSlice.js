import { createSlice } from "@reduxjs/toolkit";
const initialState={
    moodGoal:'',
    focusGoal:'',
    language:'English',
    theme:'Light'
};

const preferenceSlice=createSlice({
    name:"preferences",
    initialState,
    reducers:{
        setPreferences:(state,action)=>{
            //state contains the previous values.
            const {moodGoal,focusGoal,language,theme}=action.payload;
            state.moodGoal=moodGoal;
            state.focusGoal=focusGoal;
            state.language=language;
            state.theme=theme;
        }
    }
});
export const {setPreferences}=preferenceSlice.actions;
export default preferenceSlice.reducer; //we can import it as prefereneReducer