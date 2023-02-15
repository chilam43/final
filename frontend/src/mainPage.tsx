
import BackgroundVideo from './Component/video';
import LoginPage from './Component/login';
import { Picktoday } from './Component/pickdate';
import { useEffect } from 'react';
import { Button } from '@mantine/core';


const token: any = localStorage.getItem('token')



export default function MainPage() {
    // const dispatch = useDispatch<AppDispatch>()
    // const todoList = useSelector((state: IRootState) => state.todo.data);

    return (

        <div >




            <div  >
                <BackgroundVideo />
            </div>
            <div>
                {token && token.value == undefined ? <Button onClick={() => { localStorage.clear(); location.href = '/' }}>Login Out </Button> : <LoginPage />}

            </div>

            <div >
                <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>

                    <p style={{ fontSize: "25px" }}>Checkin and Checkout Date:</p>
                    <div><Picktoday /></div>

                </div>
            </div>







        </div>



    );
}
