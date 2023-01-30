import { useEffect, useState } from 'react';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom';





export function PicktodaySelectRoom() {
    const [total, setTotal] = useState<number>(0)
    let [searchParams, setSearchParams] = useSearchParams();

    const checkInDate: any = searchParams.get("checkInDate")
    const checkOutDate: any = searchParams.get("checkOutDate")
    const totalDay: any = searchParams.get("totalDay")
    console.log(checkInDate, checkOutDate);

    // let location = useLocation();   ************** good to know !!!!!
    // console.log("current url data", location);

    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(checkInDate),
        new Date(checkOutDate),
    ]);
    const navigate = useNavigate();
    const params: any = { checkInDate: value[0], checkOutDate: value[1], totalDay: total }

    useEffect(() => {
        caldays()
    }, [value[1]])

    function caldays() {
        let d1: any = value[0]
        let d2: any = value[1]
        let result = d2 - d1
        let one_day = 1000 * 60 * 60 * 24;
        let totalday = result / one_day
        setTotal(totalday)
    }
    function handleClick() {

        navigate({
            pathname: "/selectroom",
            search: `?${createSearchParams(params)}`,
        });


    }
    async function fetchDate() {
        await fetch('checkava', {
            method: "Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ in: value[0], out: value[1] })
        })
    }


    return (

        <>
            <div style={{ display: "flex" }}>
                <div style={{ width: "300px", margin: "0px 10px" }}>
                    <DateRangePicker
                        // label="Book hotel"
                        placeholder="Pick dates range"
                        value={value}
                        inputFormat="MM/DD/YYYY"
                        onChange={setValue}

                    />
                </div>
                <div style={{ margin: "0px 10px" }}>
                    <button type="submit" onClick={() => {
                        fetchDate(); handleClick()
                    }}>Check Availability</button>
                </div>
                <div style={{ margin: "0px 10px", display: "flex" }}>
                    {/* <div >Total: </div>
                    <div>{total}</div> */}
                </div>
            </div>
        </>
    );
}