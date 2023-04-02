import React, { useRef } from 'react'

export default function Login({ user, setUser }: any) {
    const inputElement = useRef();


    const LoginUser = () => {
        setUser(parseInt(inputElement.current.value) )
    }

    return (
        <div><input type='number' ref={inputElement} ></input><button onClick={LoginUser}></button></div>
    )
}
