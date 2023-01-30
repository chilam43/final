import { Picktoday } from "./pickdate";




export function Selectdate() {

    return (
        <div>

            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>

                <p style={{ fontSize: "25px" }}>Checkin and Checkout Date:</p>
                <div><Picktoday /></div>

            </div>


        </div>
    )
}