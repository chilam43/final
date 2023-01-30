import { Footer, MantineProvider, Text } from '@mantine/core';


import BackgroundVideo from './Component/video';

import { Selectdate } from './Component/selectdate';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from './auth/state';
// import { Route, Routes } from 'react-router-dom';
// import { Selectroom } from './selectroomPage';
import LoginPage from './Component/login';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Picktoday } from './Component/pickdate';
import { useState } from 'react';





export default function MainPage() {
    // const dispatch = useDispatch<AppDispatch>()
    // const todoList = useSelector((state: IRootState) => state.todo.data);


    return (

        <div >


            <div  >

                <div  >
                    <BackgroundVideo />
                </div>
                <div>
                    <LoginPage />

                </div>
                <div >
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>

                        <p style={{ fontSize: "25px" }}>Checkin and Checkout Date:</p>
                        <div><Picktoday /></div>

                    </div>
                </div>




            </div>


        </div>



    );
}
