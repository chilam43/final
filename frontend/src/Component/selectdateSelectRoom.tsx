
import { PicktodaySelectRoom } from "./pickdateSelectRoom";





export function SelectdateSelectRoom() {

    return (
        <div>

            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>

                <p style={{ fontSize: "25px" }}>Checkin and Checkout Date:</p>
                <div><PicktodaySelectRoom /></div>

            </div>


        </div>
    )
}