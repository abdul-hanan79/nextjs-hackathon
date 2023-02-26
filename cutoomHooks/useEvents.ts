import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitEvents, fetchEvents, updateEvent } from '../store/eventSlice'
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';
import { RootState } from '../store/Store';
// import { useRouter } from 'next/router';
const useEvents = () => {
    const router = useRouter()

    const [showComponent, setShowComponent] = useState(false)
    const auth = useSelector((state: any) => state.authSlice)
    const data = auth.user
    const [userId, setUserId] = useState("")
    const eventList = useSelector((state: any) => state.eventSlice.events)

    console.log("auth logined", auth.isLoggedIn);
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [editTitle, setEditTitle] = useState<string>('')
    const [editDate, setEditDate] = useState('')
    const [editTime, setEditTime] = useState("")
    const [editLocation, setEditLocation] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [attendess, setAttendees] = useState("")
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

    useEffect(() => {
        console.log("UseTodos component just render");
        try {
            if (auth.isLoggedIn) {
                dispatch(fetchEvents())
            }
            else {
                router.push('/login')
            }
        }
        catch (e) {
            console.log("message in fetch todos", e);
        }


    }, [dispatch])

    // const onFileChangeHandler = async (e: any) => {
    //     console.log("file change handler", e.target.files[0]);
    //     // const file = e.target.files[0]
    //     // setAttachmentImage(file)
    //     if (e.target.files > 0) {
    //         const file = e.target.files[0];
    //         // const blob = new Blob([file], { type: file.type });
    //         // Pass the `blob` object to the `submitTodo` function
    //         //   console.log("file attachment image is",blob)
    //         setAttachmentImage(file)
    //         console.log("attachment Image have value", attachmentImage);
    //     }
    // }

    const submitEvent = async () => {
        try {

            if (description != '') {
                setLoader(true)
                // setUserId(dataId)
                console.log("the value of ", title);
                console.log("the value of ", date);
                console.log("the value of ", time);
                console.log("the value of ", location);
                console.log("the value of ", description);
                console.log("the value of ", userId);

                interface EventFormData {
                    title: string;
                    date: string;
                    time: string;
                    location: string;
                    description: string;
                    userId: string;
                }

                const eventFormData: EventFormData = {
                    title,
                    date,
                    time,
                    location,
                    description,
                    userId,
                };

                await dispatch(submitEvents(eventFormData));



            }
            else {
                setAlertBox(true)
                setTimeout(() => {
                    setAlertBox(false)
                }, 2000);
            }
        }
        catch (e) {
            console.log("error on onTodoSubmitHandler", e)
        }
        finally {
            setLoader(false)
            setShowComponent(false)
            setTitle('')
            setDate('')
            setTime('')
            setLocation('')
            setDescription('')
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
        setEditDate(item.date)
        setEditTime(item.time)
        setEditLocation(item.location)
        setEditDescription(item.description)
        // setAttendees(item.)
    }
    const eventUpdateHandler = async (item: any) => {
        try {
            setLoader(true)
            // console.log("edit input in update hadnler", itemEditInput);
            const eventFormData = {
                editTitle,
                editDate,
                editTime,
                editLocation,
                editDescription,
                userId,
            };

            await dispatch(submitEvents(eventFormData));
            // await dispatch(updateEvent([editTitle, editDate, editTime, editLocation, editDescription, item]));
        }
        catch (error) {
            alert(`error in update---< ${error}`)
        }
        finally {
            setLoader(false)
            //setIsUpdate(false)
        }
    }

    // async function deleteAllDocuments(collection) {
    //     const snapshot = await collection.get();
    //     snapshot.forEach(doc => {
    //         doc.ref.delete();
    //     });
    // }
    const onTodoDeleteAllHandler = async () => {
        console.log("get into deleteHandler")
        // try {
        //     setLoader(true)
        //     const desertRef = ref(storage, `todosImages/`);
        //     const firestore = firebase.firestore();
        //     const collectionRef = firestore.collection("your-collection-name");
        //     deleteAllDocuments(collectionRef);
        //     let filteredTodos: TodoType[] = []
        //     setTodos(filteredTodos)

        // }
        // catch (error) {
        //     console.log("error in todoDeleteHandler", error);

        // }
        // finally {
        //     setLoader(false)
        // }
    }

    const goToEventsPage = () => {
        if (auth.isLoggedIn) {

            console.log("go to event page");
            router.push('/events')
        }
        else {
            router.push('/login')
        }
    }
    const componentShow = () => {
        setShowComponent(true)
    }

    return {
        goToEventsPage,
        showComponent,
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
        eventId
    }
}

export default useEvents
