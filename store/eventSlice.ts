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
import { EditEventFormData } from "../types/EditEventFormDataType";

import { EventFormData } from "../types/EventFormDataType";
import { AttendeesDetail } from "../types/AttendeesDetailDataType";



export const submitEvents = createAsyncThunk("eventSlice/submitEvents", async (eventData: EventFormData) => {
    const { title, date, time, location, description, userId, attendees } = eventData;

    console.log("submit event is running");
    console.log("submit form data in store", eventData);
    // console.log("the value of description in submit todo", description, attachmentImage);
    console.log("data of item", title, date, time, location, description, userId);
    try {

        const newDoc = {
            title: title,
            date: date,
            time: time,
            location: location,
            description: description,
            attendees: attendees,
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
        console.log("error in submit handler", e)
    }
})
export const fetchEvents = createAsyncThunk("eventSlice/fetchEvents", async () => {
    console.log("get events method");

    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        let eventsList: EventFormData[] = [];
        querySnapshot.forEach((doc) => {
            eventsList.push({
                creator: doc.data()?.creator,
                date: doc.data()?.date,
                description: doc.data()?.description,
                location: doc.data()?.location,
                time: doc.data()?.time,
                title: doc.data()?.title,
                attendees: doc.data()?.attendees,
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

export const deleteEvent = createAsyncThunk('eventSlice/deleteEvent', async (event: EventFormData) => {
    try {
        console.log("item found in thunk action", event);

        await deleteDoc(doc(db, "events", event!.id!));
        console.log("deleteing");
        return event
    } catch (error) {
        console.log("error", error);

    }

})

// interface UpdateTodoArgs {
//     itemEditInput: string;
//     item: {
//         id: string,
//         description: string,
//         attachmentURL: string,
//         createdAt: object
//     }
// }
// export const updateEvent = createAsyncThunk("todos/updateEvent", async (eventFormData,event) => {
//     try {
//         // console.log("item found in thunk update action", itemEditInput, item);

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
// type updateEventType={
//     eventFormDate:even,
//     event:
// }
type updateEventType = {
    eventFormData: EditEventFormData,
    event: EventFormData
}
export const updateEvent = createAsyncThunk("eventSlice/updateEvent", async (updateEventData: updateEventType) => {
    console.log("eventFromDate in updateEvent", updateEventData);
    const { editTitle, editDate, editTime, editLocation, editDescription } = updateEventData.eventFormData
    const updateEventId = updateEventData.event!.id!
    console.log("updateEventId", updateEventId);
    try {
        await updateDoc(doc(db, "events", updateEventId), {
            title: editTitle,
            date: editDate,
            time: editTime,
            location: editLocation,
            description: editDescription,
        });
        return updateEventData


    } catch (error) {
        alert(`error in update todo  ${error}`)
    }
})
export const updateAttendees = createAsyncThunk("eventSlice/updateAttendees", async (attendeesDetail:AttendeesDetail) => {
    console.log("the attendees", attendeesDetail);
    const { attendees, event } = attendeesDetail
    let eventId:string =event!.id!;
    // try {
    //     await updateDoc(doc(db, "events", updateEventId), {
    //         title: editTitle,
    //         date: editDate,
    //         time: editTime,
    //         location: editLocation,
    //         description: editDescription,
    //     });
    //     return updateEventData
    try {
        await updateDoc(doc(db, "events", eventId), {
            attendees: attendees
        });
        return attendeesDetail
    }
    catch (e) {
        console.log("error in updatde Attendees store", e);
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

        builder.addCase(submitEvents.fulfilled, (state, action) => {
            console.log("submit case in extra reducer", action.payload);
            // setTodos([...todos, { ...newDoc, id: docRef.id }])
            let newState: any = {
                ...state,
                events: [...state.events, action.payload]
            };
            console.log("new state is newState.events ", newState.events);
            console.log("new state is newState in submit Events", newState);

            return newState
        });
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            console.log("updateEvents", action.payload?.eventFormData);
            const events = state.events
            const unUpdateEvent = action.payload?.event
            const updatedEvent = action.payload?.eventFormData
            console.log("update Event=>", updateEvent);

            let updatedEvents = events.map((event: EventFormData) => {
                if (unUpdateEvent?.id === event.id) {
                    return {
                        title: updatedEvent?.editTitle,
                        date: updatedEvent?.editDate,
                        time: updatedEvent?.editTime,
                        location: updatedEvent?.editLocation,
                        description: updatedEvent?.editDescription,
                        id: event?.id,
                        creator: event?.creator

                    }
                }
                else {
                    return event;
                }
            });
            console.log("updated Events", updatedEvents);
            let newState: any = {
                ...state,
                events: updatedEvents,
            };
            console.log("new state in update Events", newState);
            return newState;
        });
        builder.addCase(updateAttendees.fulfilled, (state, action) => {
            console.log("updateEvents", action.payload);
            const events = state.events
            const unUpdateEvent = action.payload?.event!
            // const updatedEvent = action.payload?.attendees
            console.log("update Event=>", updateEvent);

            let updatedEvents = events.map((event: EventFormData) => {
                if (unUpdateEvent?.id === event.id) {
                    return {
                        title: unUpdateEvent.title,
                        date: unUpdateEvent.date,
                        time: unUpdateEvent.time,
                        location: unUpdateEvent.location,
                        description: unUpdateEvent.description,
                        id: event?.id,
                        creator: event?.creator,
                        attendees: action.payload?.attendees

                    }
                }
                else {
                    return event;
                }
            });
            console.log("updated attendees Events", updatedEvents);
            let newState: any = {
                ...state,
                events: updatedEvents,
            };
            console.log("new state in update Events attendees", newState);
            return newState;
        })

        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            console.log("add case in extra redyce", action.payload);
            const events: EventFormData[] = state.events;
            const deleteEvent = action.payload;
            // if (!item) {
            //     return state;
            // }
            let filteredEvents = events.filter((event) => deleteEvent?.id !== event.id);
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