import React from "react";
import '../Css/BackgroundVideo.css'
import trytry from "/playvideo/beach.mp4"


export default function BackgroundVideo() {


    return (
        <div>
            <video className='bg-video' autoPlay loop muted>
                <source src={trytry} type='video/mp4' />
            </video>




        </div>
    )
}