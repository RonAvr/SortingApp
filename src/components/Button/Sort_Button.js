import React from "react";
import Button from '@mui/material/Button';

function Sort_Button(props){
    return (<Button onClick={props.sort}>{props.title}</Button>)
}

export default Sort_Button