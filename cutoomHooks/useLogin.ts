import { async } from '@firebase/util'
import { auth, signInWithEmailAndPassword } from '../config/Firebase'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/authSlice'
const useLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const auth = useSelector((state) => state.authSlice)
    // console.log("auth is login", auth.isLoggedIn);
    useEffect(() => {
        if (auth.isLoggedIn) {
            router.push("/");
        }
        console.log("auth in login", auth.isLoggedIn);
    }, [auth])
    const onSubmitHandler = async () => {
        try {
            setLoader(true)
            // const response = await signInWithEmailAndPassword(auth, email, password)
            await dispatch(loginUser({ email, password }))
            // console.log("response user+++++>", response.UserImpl.accessToken);
            router.push('/')
        }
        catch (e) {
            console.log("error in login", e);
        }
        finally {
            setLoader(false)
        }
    }
    const goToSignupPage = () => {
        console.log("go to signup page is working");
        router.push('/signup')
    }
    return {
        email,
        setEmail,
        password,
        setPassword,
        loader,
        onSubmitHandler,
        goToSignupPage,


    }
}

export default useLogin
