import { Button, TextInput, Textarea } from "@mantine/core";
import { IconLivePhotoOff } from "@tabler/icons";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

export function SetRoomPricePicContent() {
    const [value, setValue] = useState('');
    const [textAreaValue, setTextareaValue] = useState('');
    const [file, setFile] = useState<any>()
    const ref = useRef(null);

    // const [roomAPic, setRoomAPic] = useState<File>();
    // const [roomBPic, setRoomBPic] = useState<File>();
    // const [roomCPic, setRoomCPic] = useState<File>();
    // const [roomDPic, setRoomDPic] = useState<File>();
    const [roomInfo, setroomInfo] = useState<any[]>([])
    // console.log(roomInfo);



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, roomName: string) => {
        if (e.target.files) {
            if (roomName === "A") {
                setFile(e.target.files[0]);
            }

            if (roomName === "B") {
                setFile(e.target.files[0]);
            }
            if (roomName === "C") {
                setFile(e.target.files[0]);
            }
            if (roomName === "D") {
                setFile(e.target.files[0]);
            }
        }
    };

    useEffect(() => {
        async function loadRoomInfo() {
            let res = await fetch('http://localhost:8080/loadRoomInfo')
            let roomInfo = await res.json()


            setroomInfo(roomInfo.result)
        }
        loadRoomInfo()
    }, [])

    async function submitFile(room: string, roomid: any) {
        const formData = new FormData()
        formData.append("price", value)
        formData.append("content", textAreaValue)
        formData.append("file", file)
        formData.append("id", roomid)

        const res = await fetch("http://localhost:8080/" + room, {
            method: "Post",
            body: formData,
        })
        window.location.reload();
    }


    function inputData(
    ) {

        return (
            <>
                {roomInfo.map(v =>
                    <div>
                        {/* <form onSubmit={(e) => { submitData(e, v.room_type) }}> */}
                        <h2>Update {v.room_type} Info</h2>
                        <TextInput

                            type="text"
                            id={v.id}
                            name={v.room_type}
                            defaultValue={v.price}
                            onChange={(event) => { event.target.value == null ? setValue(v.price) : setValue(event.target.value) }}
                        // onChange={(e: any) => setState({ ...state, [`${keyA}`]: e.target.value })}
                        >
                        </TextInput>
                        <Textarea
                            autosize

                            id={v.id}
                            name={v.room_type}
                            defaultValue={v.content}

                            onChange={(event) => { event.currentTarget.value == null ? setTextareaValue(v.content) : setTextareaValue(event.currentTarget.value) }}
                        // onChange={(e: any) => setState({ ...state, [`${keyB}`]: e.target.value })}
                        >
                        </Textarea>
                        <div>
                            <input type="file" onChange={(e) => handleFileChange(e, v.room_type)} />
                            {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
                        </div>
                        <Button type="submit" onClick={() => {
                            console.log("frontend", value, textAreaValue);

                            submitFile(v.room_type, v.id)
                        }}>Submit
                        </Button>
                        {/* </form> */}
                    </div>
                )}
            </>
        )
    }




    // async function submitData(e: FormEvent<HTMLFormElement>, differentPath: any) {
    //     e.preventDefault()
    //     let res = await fetch('http://localhost:8080/' + differentPath, {
    //         method: "Post",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ value, textAreaValue }),
    //     })

    //     let result = await res.json()
    //     return
    // }


    return (
        <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <div style={{ marginLeft: "1000px" }}>
                <Button onClick={() => { localStorage.clear(); location.href = '/' }}>Login Out </Button>
            </div>
            <div>

                {inputData()}
            </div>

        </div >
    )
}