import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'react-bootstrap'
import useLogin from '../cutoomHooks/useLogin'
import useSignup from '../cutoomHooks/useSignup'


const MainButton = (props: any) => {
    return (
        <div>
            <Button className={`main-btn rounded-pill ${props.className}`} size="lg" onClick={props.onClick}>
                {props.title}
            </Button>
        </div>
    )
}

export default MainButton
