import { Button, TextInput, Textarea } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react"

export function SetRoomPricePicContent() {
    const [state, setState] = useState({
        Aprice: "",
        Bprice: "",
        Cprice: "",
        Dprice: "",
        Acontent: "",
        Bcontent: "",
        Ccontent: "",
        Dcontent: "",
    })

    const [roomAPic, setRoomAPic] = useState<File>();
    const [roomBPic, setRoomBPic] = useState<File>();
    const [roomCPic, setRoomCPic] = useState<File>();
    const [roomDPic, setRoomDPic] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, roomName: string) => {
        if (e.target.files) {
            if (roomName === "roomA") {
                setRoomAPic(e.target.files[0]);
            }

            if (roomName === "roomB") {
                setRoomBPic(e.target.files[0]);
            }
            if (roomName === "roomC") {
                setRoomCPic(e.target.files[0]);
            }
            if (roomName === "roomD") {
                setRoomDPic(e.target.files[0]);
            }
        }
    };

    type FormState = typeof state;

    function inputData(
        placeholderPrice: string,
        key: keyof FormState,
        type: "text" | "number") {
        return (
            <>
                <TextInput
                    placeholder={placeholderPrice}
                    type={type}
                    id={key}
                    name={key}
                    value={state[key]}
                    onChange={(e: any) => setState({ ...state, [`${key}`]: e.target.value })}>
                </TextInput>
            </>
        )
    }
    function inputRoomDeatail(
        placeholderContent: string,
        key: keyof FormState,
        // type: any
    ) {
        return (
            <>
                <Textarea
                    autosize
                    placeholder={placeholderContent}
                    // type={type}
                    id={key}
                    name={key}
                    value={state[key]}
                    onChange={(e: any) => setState({ ...state, [`${key}`]: e.target.value })}>
                </Textarea>

            </>
        )
    }
    function uploadfile(roomName: any) {
        return (
            <div>
                <input type="file" onChange={(e) => handleFileChange(e, roomName)} />
                {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
            </div>
        );
    }
    async function submitData(e: FormEvent<HTMLFormElement>, differentPath: any) {
        e.preventDefault()
        let res = await fetch('http://localhost:8080/' + differentPath, {
            method: "Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
        })

        let result = await res.json()
        return
    }


    return (
        <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <div>
                <form onSubmit={(e) => { submitData(e, "aRoomPath") }}>
                    <h2>Update Room A Info</h2>
                    {inputData("Price of Room A", "Aprice", "number")}
                    {inputRoomDeatail("Room A Content", "Acontent")}
                    {uploadfile("roomA")}
                    <Button type="submit" onClick={() => { }}>Submit
                    </Button>
                </form>
            </div>
            <div>
                <form onSubmit={(e) => { submitData(e, "bRoomPath") }}>
                    <h2>Update Room B Info</h2>
                    {inputData("Price of Room B", "Bprice", "number")}
                    {inputRoomDeatail("Room B Content", "Bcontent")}
                    {uploadfile("roomB")}
                    <Button type="submit" onClick={() => { }}>Submit
                    </Button>
                </form>
            </div>
            <div>
                <form onSubmit={(e) => { submitData(e, "cRoomPath") }}>
                    <h2>Update Room C Info</h2>
                    {inputData("Price of Room C", "Cprice", "number")}
                    {inputRoomDeatail("Room C Content", "Ccontent")}
                    {uploadfile("roomC")}
                    <Button type="submit" onClick={() => { }}>Submit
                    </Button>
                </form>
            </div>
            <div>
                <form onSubmit={(e) => { submitData(e, "dRoomPath") }}>
                    <h2>Update Room D Info</h2>
                    {inputData("Price of Room D", "Dprice", "number")}
                    {inputRoomDeatail("Room D Content", "Dcontent")}
                    {uploadfile("roomD")}
                    <Button type="submit" onClick={() => { }}>Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}