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
import { EventType } from "../types/EventType";

type EventFormData = {
    title: string;
    date: Date;
    time: string;
    location: string;
    description: string;
    userId: string,
    invitees?: string[];
};


export const submitEvents = createAsyncThunk("eventSlice/submitEvents", async (eventData: EventFormData) => {
    const { title, date, time, location, description, userId } = eventData;
    console.log("submit Todo is running");
    // console.log("the value of description in submit todo", description, attachmentImage);
    console.log("data of item", title, date, time, location, description, userId);
    try {

        const newDoc = {
            title: title,
            date: date,
            time: time,
            location: location,
            description: description,
            creator: userId
        }
        console.log("the new docs are ", newDoc);
        const docRef = await addDoc(collection(db, 'events'), newDoc)
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
export const fetchEvents = createAsyncThunk("eventSlice/fetchEvents", async () => {
    console.log("get events method");

    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        let eventsList: EventType[] = [];
        querySnapshot.forEach((doc) => {
            eventsList.push({
                creator: doc.data()?.creator,
                date: doc.data()?.date,
                description: doc.data()?.description,
                location: doc.data()?.location,
                time: doc.data()?.time,
                title: doc.data()?.title,
                id: doc.id,

            });
        });

        console.log("todos in action - slice", eventsList);
        return eventsList;
    } catch (error) {
        console.log("================catch====================");
        console.log(error);
        console.log("====================================");
    }
});

export const deleteEvent = createAsyncThunk('eventSlice/deleteEvent', async (event) => {
    try {
        console.log("item found in thunk action", event);

        await deleteDoc(doc(db, "events", event?.id));
        console.log("deleteing");
        return event
    } catch (error) {
        console.log("error", error);

    }

})
// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (item: TodoType) => {
//     try {
//         console.log("item found in thunk action", item);



//         const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
//         await deleteObject(desertRef)
//         await deleteDoc(doc(db, "todoapp", item.id));
//         console.log("deleteing");
//         return item
//     } catch (error) {
//         console.log("error", error);

//     }

// })

// interface UpdateTodoArgs {
//     itemEditInput: string;
//     item: {
//         id: string,
//         description: string,
//         attachmentURL: string,
//         createdAt: object
//     }
// }
// export const updateTodo = createAsyncThunk("todos/updateTodos", async ({ itemEditInput, item }: UpdateTodoArgs) => {
//     try {
//         console.log("item found in thunk update action", itemEditInput, item);

//         // Get a reference to the old image file
//         const oldImageRef = ref(storage, `todosImages/${item.description}.jpg`);

//         // Delete the old image file
//         await deleteObject(oldImageRef);

//         // Construct the new file name using the new description
//         const newFileName = `${itemEditInput}.jpg`;

//         // Get a reference to the new image file
//         const newImageRef = ref(storage, `todosImages/${newFileName}`);

//         // Upload the new image file to Storage
//         await put(newImageRef, attachmentImage);

//         // Update the document in Firestore with the new description and the new file name
//         await updateDoc(doc(db, "todoapp", item.id), {
//             capital: true,
//             description: itemEditInput,
//             imageFileName: newFileName,
//             createdAt: new Date()
//         });

//         return { itemEditInput, item };

//     } catch (error) {
//         alert(`error in update todo  ${error}`);
//     }
// });

export const updateEvent = createAsyncThunk(
    "todos/updateTodos",
    async (args, { getState }) => {
        const [editTitle, editDate, editTime, editLocation, editDescription, item] = args;
        try {
            // console.log("item found in thunk update action", itemEditInput, item);


            // !IMPORT TO DO 
            // const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
            // await deleteObject(desertRef)
            // await deleteDoc(doc(db, "todoapp", item.id))
            // let filteredTodos = todos.filter((todo) => item.id !== todo.id)
            // setTodos(filteredTodos)
            await updateDoc(doc(db, "event", item.id), {
                title: editTitle,
                date: editDate,
                time: editTime,
                location: editLocation,
                description: editDescription,

            });
            return {
                editTitle,
                editDate,
                editTime,
                editLocation,
                editDescription, item
            }

        } catch (error) {
            alert(`error in update todo  ${error}`)
        }


    })
// Define your slice
const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: { events: [], error: null },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            console.log("state in extra builder", state)
            console.log("fetch todo in extra reducers", action.payload);
            let newState: any = {
                ...state,
                events: action.payload,
            };
            console.log("fetched data ", newState);
            return newState;
        });



        // builder.addCase(deleteTodo.fulfilled, (state, action) => {
        //     console.log("add case in extra redyce", action.payload);
        //     const todos: TodoType[] = state.todos;
        //     const item = action.payload;
        //     if (!item) {
        //         return state;
        //     }
        //     let filteredTodos = todos.filter((todo) => item.id !== todo.id);
        //     let newState: any = {
        //         ...state,
        //         todos: filteredTodos,
        //     };
        //     return newState;
        // });

        builder.addCase(submitEvents.fulfilled, (state, action) => {
            console.log("submit case in extra reducer", action.payload);
            // setTodos([...todos, { ...newDoc, id: docRef.id }])
            let newState: any = {
                ...state,
                events: [...state.events, action.payload]
            };
            console.log("new state is ", newState.events);
            console.log("new state is ", newState);
            // fetchTodos()
            return newState
        });
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            // console.log("item  case in extra reduce", action.payload?.itemEditInput);
            // console.log("update  case in extra reduce", action.payload?.item);
            const events = state.events;
            // const item = action.payload?.item;
            let updatedEvents = events.map((event) => {
                // editTitle,
                // editDate,
                // editTime,
                // editLocation,
                // editDescription, item
                // console.log('====================================');
                // console.log(item?.id, todo.id);
                // console.log('====================================');
                if (item?.id === event.id) {
                    return {
                        title: action.payload?.editTitle,
                        date: action.payload?.editDate,
                        time: action.payload?.editTime,
                        location: action.payload?.editLocation,
                        description: action.payload?.editDescription,
                        id: event?.id,

                    }
                }
                else {
                    return event;
                }
            });
            // console.log("updated Todos", updatedTodos);
            let newState: any = {
                ...state,
                events: updatedEvents,
            };
            return newState;
        });

        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            console.log("add case in extra redyce", action.payload);
            const events = state.events;
            const deleteEvent = action.payload;
            // if (!item) {
            //     return state;
            // }
            let filteredEvents = events.filter((event) => deleteEvent.id !== event.id);
            let newState: any = {
                ...state,
                events: filteredEvents,
            };

            console.log("new state", newState);
            return newState;
        });

    },
});

// Export the reducer

export default eventSlice.reducer