// import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/Firebase";
// import { EditIcon } from "@chakra-ui/icons";
// import { TodoType } from "../types/TodoType";


export const submitUser = createAsyncThunk("user/submitUser", async (item) => {
    console.log("submit user is running");
    console.log("the value of user details", item?.userName, item?.email, item?.password);
    try {
        const newDoc = {
            displayName: item.userName,
            email: item.email,
            password: item.password
        }
        const docRef = await addDoc(collection(db, 'users'), newDoc)
        console.log("docRef id ", docRef.id)
        const submitedDoc = {
            ...newDoc,
            id: docRef.id
        }

        console.log("submited doc", submitedDoc);
        return submitedDoc
        // setTodos([...todos, { ...newDoc, id: docRef.id }])
    }
    catch (e) {
        console.log("error in submit hadnler")
    }
})
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    console.log("get todos method");

    try {
        const querySnapshot = await getDocs(collection(db, "todoapp"));
        let todosList: TodoType[] = [];
        querySnapshot.forEach((doc) => {
            todosList.push({
                attachmentURL: doc.data()?.attachmentURL,
                description: doc.data()?.description,
                id: doc.id,
                createdAt: doc.data()?.createdAt,
            });
        });

        console.log("todos in action - slice", todosList);
        return todosList;
    } catch (error) {
        console.log("================catch====================");
        console.log(error);
        console.log("====================================");
    }
});



// Define your slice
const userSlice = createSlice({
    name: 'UserSlice',
    initialState: { users: [], error: null },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log("state in extra builder", state)
            console.log("fetch todo in extra reducers", action.payload);
            let newState: any = {
                ...state,
                users: action.payload,
            };
            console.log("fetched data ", newState);
            return newState;
        });
        builder.addCase(submitUser.fulfilled, (state, action) => {
            console.log("submit case in extra reducer", action.payload);
            // setTodos([...todos, { ...newDoc, id: docRef.id }])
            let newState: any = {
                ...state,
                users: [...state.users, action.payload]
            };
            console.log("new state is ", newState.todos);
            console.log("new state is ", newState);
            // fetchTodos()
            return newState
        });




    },
});

// Export the reducer

export default userSlice.reducer