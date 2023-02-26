import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "../config/Firebase";




export const fetchCurrentUser = createAsyncThunk(
    "auth/checkUSerSignIn",
    async () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("onAuthStateChanged", user);

                    resolve(user);
                } else {
                    resolve(false);
                }
            });
            unsubscribe();
        });
    }
);
export const signupUser = createAsyncThunk('authUser/signupUser', async (item: any) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, item.email, item.password)
        console.log("the user i singup", user);
        return user
    }
    catch (e) {
        console.log("error in singup user", e);
    }




})
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }: any) => {
    console.log("login", email, password);
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        return user
    }
    catch (e) {
        alert("login error")

    }

})
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoggedIn: false,
        error: null,
        signupUser: {},
        currentUserRequestLoader: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.fulfilled, (state, action) => {
            let newState: any = {
                ...state,
                signupUser: action.payload,
            };
            console.log("newState after signup", newState);

            return newState;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("the user at login is", action.payload?.user);
            if (action.payload?.user) {
                let newState: any = {
                    ...state,
                    user: action.payload?.user,
                    isLoggedIn: true,
                    currentUserRequestLoader: false /*this is extra*/
                };
                console.log("user after login", newState.user);

                return newState;
            }

            return {
                ...state
            };
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            console.log("newState after current user start", action);

            if (action.payload) {
                let newState: any = {
                    ...state,
                    user: action.payload,
                    isLoggedIn: true,
                    currentUserRequestLoader: false
                };
                console.log("newState after current user", newState);

                return newState;
            }
            return {
                ...state,
                currentUserRequestLoader: false
            };
        });
    }

})

export default authSlice.reducer