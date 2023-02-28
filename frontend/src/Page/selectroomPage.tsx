

import { Center, Grid, Text, Container, Image, Button } from '@mantine/core';
import { Selectdate } from '../Component/selectdate';
import { Route, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { SelectdateSelectRoom } from '../Component/selectdateSelectRoom';
import BackgroundVideo from '../Component/video';
import { SetRoomPricePicContent } from '../Component/setRoomPricePicContent';
///////////  在req.user 內已種左user id   因為local storage 內已有token/////





export function Selectroom() {
    const [roomInfo, setroomInfo] = useState<any[]>([])
    let [searchParams, setSearchParams] = useSearchParams();
    const checkInDate: any = searchParams.get("checkInDate")
    const checkOutDate: any = searchParams.get("checkOutDate")
    const totalDay: any = searchParams.get("totalDay")
    const [amount, setAmount] = useState<any>()
    const [roomPrice, setRoomPrice] = useState<number>()
    // console.log("frontend", roomInfo);
    const [roomID, setRoomID] = useState<any>()

    useEffect(() => {


        async function searchAvailableRoom(checkInDate: any, checkOutDate: any) {
            let res = await fetch('http://localhost:8080/roomAva', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ checkInDate, checkOutDate })

            })
            let roomAvailable = await res.json()
            console.log("real available room", roomAvailable.result);
            setroomInfo(roomAvailable.result)
        }
        searchAvailableRoom(checkInDate, checkOutDate)


    }, [])

    function calculateAmount(roomPrice: number) {
        setAmount(totalDay * roomPrice)
    }
    const token: any = localStorage.getItem('token')
    async function submitInfo(from: any, to: any, price: any, roomId: number) {
        let res = await fetch("http://localhost:8080/bookingRoom", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from, to, price, roomId, token })
        })
        let bookingRoomResult = await res.json()
    }


    return (
        <div >

            <div  >
                <BackgroundVideo />
            </div>

            <div>
                {token && token.value == undefined && <Button onClick={() => { localStorage.clear(); location.href = '/' }}>Login Out </Button>}
            </div>
            <div style={{ backgroundColor: 'white', }} >
                <SelectdateSelectRoom />
            </div>

            <br></br>
            <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} justify={"center"} align={"space-around"}  >
                <Grid.Col span={6} >
                    {/* render room info from here!!! */}

                    {roomInfo.map(v =>
                        <Container style={{ height: "25vh", backgroundColor: 'white', paddingTop: "10px" }}>
                            <div style={{ display: "flex", margin: "0px" }}>
                                <Image style={{ height: "400px", width: "200px" }}
                                    radius="md"
                                    src={`http://localhost:8080/${v.picture}`}
                                />

                                <Container style={{ alignSelf: '100%', height: "25vh", width: "15vh", margin: 0, paddingRight: "200px" }}>
                                    <div>
                                        <p style={{ width: "30vh" }}>{v.content}</p>
                                        <hr></hr>
                                        <div>$ {v.price}</div>
                                    </div>
                                </Container>
                                <Button style={{ alignItems: "center", margin: "65px 0px" }}
                                    onClick={() => { calculateAmount(v.price); setRoomID(v.id); setRoomPrice(v.price) }}>Submit</Button>
                            </div>
                        </Container>
                    )}





                </Grid.Col>

                <Grid.Col span={4} >
                    <Container style={{ border: "black solid 4px", height: "25vh", backgroundColor: 'white', }}>

                    </Container>
                    <br></br>
                    <Container style={{ border: "black solid 4px", height: "50vh", backgroundColor: 'white', }}>
                        <div style={{ display: "inline-block", padding: "30px 0px" }}>
                            <div>Check In Date :</div>
                            <hr></hr>
                            <div> {checkInDate}</div>
                            <br></br>

                            <div>Check Out Date :</div>
                            <hr></hr>
                            <div> {checkOutDate}</div>
                            <br></br>

                            <div style={{ display: "flex", paddingLeft: "30px" }}>
                                <div style={{ paddingLeft: "30px" }} >TotalDay : <div> {totalDay}</div></div>

                                <div style={{ paddingLeft: "30px" }}>Amount:  <div> {amount}</div></div>
                            </div>
                        </div>
                        <Button style={{
                            alignItems: 'flex-end', marginLeft: "300px"
                        }}
                            onClick={() => { submitInfo(checkInDate, checkOutDate, roomPrice, roomID) }}>Submit</Button>
                    </Container>
                </Grid.Col>



            </Grid>

        </div >
    );
}