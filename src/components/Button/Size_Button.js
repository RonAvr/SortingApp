import React from "react";
import Button from '@mui/material/Button';

function Size_Button(props){
    return (<Button onClick={props.generate} text={props.title}>{props.title}</Button>)
}

export default Size_Button