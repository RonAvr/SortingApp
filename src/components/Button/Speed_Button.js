import React from "react";
import Button from '@mui/material/Button';

function Speed_Button(props){
    return (<Button onClick={props.speed} text={props.title} style={{textTransform
    :'none'}}>{props.title}</Button>)
}

export default Speed_Button