import { createSlice,PayloadAction} from "@reduxjs/toolkit";

declare type userBadgeType = "message";

export interface userData {
    profil:any; //user conncté
    current: any; // user encours
    list:any[];//liste des users
    contacts:any[];
    badge:{message:number}
}

const initialState: userData = {
    profil :{},
    current:{},
    list:[],
    contacts:[],badge:{message:0}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserProfil:(state, action: PayloadAction<any>) =>{
            state.profil = action.payload;
        },
        
        setUserCurrent:(state, action: PayloadAction<any>) =>{
            state.profil = action.payload;
        },
        setUserList:(state, action: PayloadAction<any>) =>{
            state.profil = action.payload;
        },
        setUserContacts:(state, action: PayloadAction<any>) =>{
            state.profil = action.payload;
        }

    }
});

export const {

    setUserProfil, setUserContacts, setUserCurrent,setUserList
}  = userSlice.actions

export default userSlice.reducer
