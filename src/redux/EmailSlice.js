import { createSlice } from "@reduxjs/toolkit"


export const EmailSlice = createSlice({
    name: 'email',
    initialState:{
        HomeEmails:[],
        email:[],
        singleEmail:[],
        open:false
    },
    reducers:{
        SetHomeEmails:(state,action)=>{
            state.HomeEmails = action.payload
        },
        SetEmails:(state,action)=>{
            state.email = action.payload
        },
        SetSingleEmail:(state,action)=>{
            state.singleEmail=action.payload
        },
        setopen:(state,action)=>{
            state.open = action.payload
        }

    }
})

export const {SetHomeEmails,SetEmails,SetSingleEmail,setopen}=EmailSlice.actions;