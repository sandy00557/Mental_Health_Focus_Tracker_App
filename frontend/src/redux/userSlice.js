// import { createSlice } from "@reduxjs/toolkit";

// const initialState={
//     name:'',
//     email:'',
//     nickname:'',
//     password:''
// };

// const userSlice=createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         registerUser:(state,action)=>{
//             const {name,email,nickname,password}=action.payload;
//             state.name=name;
//             state.email=email;
//             state.nickname=nickname;
//             state.password=password;
//         },
//     }
// });

// export const {registerUser} =userSlice.actions;
// export default userSlice.reducer;



//v2 for GamesSection 
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:'',
    email:'',
    nickname:'',
    password:'',
    points:0
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        registerUser:(state,action)=>{
            const {name,email,nickname,password,points=0}=action.payload;
            state.name=name;
            state.email=email;
            state.nickname=nickname;
            state.password=password;
            state.points=points;
        },
        addPoints:(state,action)=>{
            state.points+=action.payload; //dispatch(addPoints(10)); // add 10 points

        },
        setPoints:(state,action)=>{
            state.points=Number(action.payload) || 0; //dispatch(setPoints(20)); // initializes points to 20

        },
        setNickname:(state,action)=>{
            state.nickname=action.payload; //dispatch(setNickname('NewNick')); // sets nickname to 'NewNick'
        }
    }
});

export const {registerUser,addPoints,setPoints,setNickname} =userSlice.actions;

//new code
export const selectPoints = (state) => state.user.points;
export const selectNickName=(state)=>state.user.nickname;

export default userSlice.reducer;
