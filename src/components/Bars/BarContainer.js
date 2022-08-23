import React, { useEffect } from "react";
import Bar from "./Bar";

function BarContainer(props){
    // useEffect(() => {},[props.data])
    return (
        props.data?.map(bar => {
            return <Bar data={bar} key={Math.random()}/>
        })
    )
}

export default BarContainer