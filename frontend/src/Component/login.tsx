
import { FormEvent, useState } from 'react';
import { Register } from './regisger';
import { Routes, Route } from 'react-router-dom';
import { Selectroom } from '../Page/selectroomPage';


export default function LoginPage() {
    const [opened, setOpened] = useState(false);
    const [state, setState] = useState<any>({
        email: "",
        password: "",

    })
    const [loginResult, setLoginResult] = useState<any>()
    // console.log(state);

    // const [opened, setOpened] = useState(false);
    // function reset() {
    //     setState({ ...state, username: "" })
    // }
    // function reset2() {
    //     setState({ ...state, password: "" })
    // }

    async function loginfun(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // const form = e.target as HTMLFormElement

        let res = await fetch('http://localhost:8080/login', {
            method: "Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
        })

        let result = await res.json()

        console.log("frontend", result);
        localStorage.setItem('token', result.token)

        {
            if (result.token && result.result == 2) { (location.href = '/setroomdetail') }
            else if (result.token && result.result == 1) { (location.href = '/selectroom') }
            else { (location.href = '/unprotectPage') }

        }

    }


    return (

        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <Register />
                </div>
                <div>
                    <form onSubmit={e => loginfun(e)}>
                        <div style={{ display: 'flex', }} >

                            <div style={{ display: 'flex', }} >
                                <div style={{ display: 'flex', margin: "0px 10px", justifyContent: "center", alignItems: "center" }}>
                                    <p >email:</p>
                                    <div>
                                        <input placeholder='email' type="text" id="email" name="email" value={state.email} onChange={e => { setState({ ...state, email: e.currentTarget.value }) }}  ></input>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', margin: "0px 10px", justifyContent: "center", alignItems: "center" }}>
                                    <p>Password:</p>
                                    <div>
                                        <input placeholder='password' type="password" id="password" name='password' value={state.password} onChange={e => { setState({ ...state, password: e.currentTarget.value }) }} ></input>
                                    </div>
                                    <div style={{ padding: "0px 10px" }}>
                                        <button >Login</button>
                                    </div>
                                    <div>
                                        {loginResult == "false" && "Wrong Password Or Username"}
                                    </div>



                                </div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    );
}

