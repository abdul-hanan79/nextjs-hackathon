import { async } from '@firebase/util'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { auth, createUserWithEmailAndPassword } from '../config/Firebase'
import { signupUser } from '../store/authSlice'
import { RootState } from '../store/Store'
import { submitUser } from '../store/userSlice'

// import { toast } from "react-toastify";

const useSingup = () => {
    const [userName, setUsername] = useState<string>("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

    console.log("the value of username", userName);
    console.log("the value of email", email);
    console.log("the value of password", password);
    const onSubmitHandler = async () => {
        try {
            setLoader(true)
            console.log("the value of username", userName);
            console.log("the value of email", email);
            console.log("the value of password", password);
            // const response = await createUserWithEmailAndPassword(auth, email, password)
            // console.log("response user+++++>", response.user);
            // sessionStorage.setItem('Token', response.user.accessToken);
            await dispatch(signupUser({ email, password }))
            await dispatch(submitUser({ userName, email, password }))
            // alert('Successfully singup!');
            router.push('/login')
        }
        catch (e) {
            console.log("error in signup ", e);
        }
        finally {
            setLoader(false)
        }
    }
    return {
        userName,
        setUsername,
        email,
        setEmail,
        password, setPassword, loader, onSubmitHandler
    }
}

export default useSingup
