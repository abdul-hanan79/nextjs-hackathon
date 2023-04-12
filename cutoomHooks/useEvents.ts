import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitEvents, fetchEvents, updateEvent, deleteEvent, updateAttendees } from '../store/eventSlice'
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';
import { RootState } from '../store/Store';
import authSlice from '../store/authSlice';
import { EditEventFormData } from '../types/EditEventFormDataType';
import { EventFormData } from '../types/EventFormDataType';
// import { useRouter } from 'next/router';
const useEvents = () => {
    const router = useRouter()
    const [showComponent, setShowComponent] = useState(false)
    const auth = useSelector((state: any) => state.authSlice)
    const data = auth.user.uid
    console.log("user id in useEvents");
    const [userId, setUserId] = useState("")

    const eventList = useSelector((state: any) => state.eventSlice.events)
    console.log("auth logined", auth.isLoggedIn);
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [attendees, setAttendees] = useState([]);

    const [editTitle, setEditTitle] = useState<string>('')
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("")
    const [editLocation, setEditLocation] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [eventId, setEventId] = useState("")
    const [loader, setLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [alertBox, setAlertBox] = useState(false)
    // const dispatch = useDispatch();
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    console.log("auth calling back", auth);
    // useEffect(() => {
    //     if (!auth.isLoggedIn && auth.currentUserRequestLoader) {
    //         // setUserId(auth.user.uId)
    //         // console.log("the user id in useEvent", userId);
    //         router.push("/login");
    //     }
    // }, [auth])


    const submitEvent = async () => {
        try {
            if (description != '') {
                setLoader(true);
                const eventFormData: EventFormData = {
                    title,
                    date,
                    time,
                    location,
                    description,
                    attendees,
                    userId: data,
                };
                console.log("event from data in sbumit", eventFormData);
                await dispatch(submitEvents(eventFormData));
                setShowComponent(false);
                console.log("the submit event showcompnent", showComponent);
                await dispatch(fetchEvents())
                console.log("this is runnying");
            }
            else {
                setAlertBox(true);
                setTimeout(() => {

                    setAlertBox(false);
                }, 2000);
            }
        }
        catch (e) {
            console.log("error on onTodoSubmitHandler", e);
        }
        finally {
            console.log("finally is working");
            setLoader(false);
            // console.log("the value of show case", showComponent);
            setTitle('');
            setDate('');
            setTime('');
            setLocation('');
            setDescription('');
        }
    }

    // const todoDeleteHandler = async (item) => {
    //     console.log("get into deleteHandler")
    //     try {
    //         setLoader(true)
    //         // await
    //         await dispatch(deleteTodo(item))
    //         console.log("delte todo is running");
    //     }
    //     catch (error) {
    //         console.log("error in todoDeleteHandler", error);
    //     }
    //     finally {
    //         setLoader(false)
    //     }
    // }


    const eventEditHandler = (item: any) => {
        console.log("updated handler====-", item);
        // setTodoDescription(item.description)
        // setItemEditInput(item.description)
        //setIsUpdate(true)
        setIsUpdate(true)
        setEventId(item.id)
        // setTodoId(item.id)    
        setEditTitle(item.title)
        // const dateObj = new Date(item.date);
        setEditDate(item.date);
        setEditTime(item.time)
        setEditLocation(item.location)
        setEditDescription(item.description)
        setUserId(item.creator)
        // setAttendees(item.)
    }
    const eventJoinHandler = async (event: EventFormData) => {
        const eventId = event?.id // replace with the actual ID of the event you want to select
        const selectedEvent = eventList.find((event: EventFormData) => event.id === eventId);
        console.log("selected event", selectedEvent);

        let attendees = selectedEvent.attendees;
        console.log("list of attendees", attendees);

        attendees = [...attendees, data];
        console.log("user id in attendees", data);
        console.log("updated list of attendees", attendees);
        try {
            const addAttendees = {
                attendees,
                event
            }
            await dispatch(updateAttendees(addAttendees))
        }
        catch (e) {
            console.log("error in updateAttendees", e);
        }
    }

    const eventUpdateHandler = async (event: any) => {
        try {
            setLoader(true)
            console.log("event in eventUpdateHandler", event);
            // console.log("edit input in update hadnler", itemEditInput);

            const eventFormData: EditEventFormData = {
                editTitle,
                editDate,
                editTime,
                editLocation,
                editDescription,
                userId,
            };
            console.log("eventForm data", eventFormData);
            await dispatch(updateEvent({ eventFormData, event }));
            // await dispatch(updateEvent([editTitle, editDate, editTime, editLocation, editDescription, item]));
        }
        catch (error) {
            alert(`error in update---< ${error}`)
        }
        finally {
            setLoader(false)
            setIsUpdate(false)
        }
    }

    // async function deleteAllDocuments(collection) {
    //     const snapshot = await collection.get();
    //     snapshot.forEach(doc => {
    //         doc.ref.delete();
    //     });
    // }

    const goToEventsPage = () => {

        console.log("event.ts");
        console.log("Use events component just render");
        try {
            if (auth.isLoggedIn) {
                router.push('/events')
                dispatch(fetchEvents())
                console.log("user is logined");
            }
            else {
                router.push('/login')
                console.log("user is not logined");

            }
        }
        catch (e) {
            console.log("message in fetch events", e);
        }





    }
    const componentShow = () => {
        setShowComponent(true)
    }
    const eventDeleteHandler = async (event: EventFormData) => {
        console.log("event is", event)
        try {

            setLoader(true)
            await dispatch(deleteEvent(event))

        }
        catch (error) {
            console.log("error in event delete handler", error)
        }
        finally {
            setLoader(false)
        }
    }
    const handleDateChange = (e: any) => {
        const selectedDate = e.target.value;
        const isoDate = new Date(selectedDate).toISOString();
        const dateOnly = isoDate.split('T')[0];
        console.log("dateOnly", dateOnly);
        setEditDate(dateOnly);
        console.log("date=>1", date);

    }
    const handleSubmitDateChange = (e: any) => {
        const selectedDate = e.target.value;
        const isoDate = new Date(selectedDate).toISOString();
        const dateOnly = isoDate.split('T')[0];
        setDate(dateOnly);
        console.log("this is working");
        console.log("date=>", date);


    }
    return {
        goToEventsPage,
        showComponent,
        setShowComponent,
        // users,
        componentShow,
        setTitle,
        setDate,
        setTime,
        setLocation,
        setDescription,
        submitEvent,
        eventList,
        userId,
        setEditTitle,
        setEditDate,
        setEditTime,
        setEditLocation,
        setEditDescription,
        title,
        date,
        time,
        location,
        description,
        editTitle,
        editDate,
        editTime,
        editLocation,
        editDescription,
        isUpdate,
        eventEditHandler,
        eventUpdateHandler,
        eventId,
        eventDeleteHandler,
        handleDateChange,
        handleSubmitDateChange,
        eventJoinHandler
    }
}

export default useEvents
