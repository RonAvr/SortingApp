import React from "react";
import classes from "./Header.module.css";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import PanToolIcon from "@mui/icons-material/PanTool";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Header(props) {
  let startOrStopButton = props.canPlay ? (
    <Button
      variant="outlined"
      value="start"
      onClick={props.sort}
      disabled={props.started}
    >
      Start Sorting
      <PlayCircleFilledTwoToneIcon />
    </Button>
  ) : (
    <Button variant="outlined" value="start" onClick={props.stop}>
      Stop Sorting
      <PanToolIcon />
    </Button>
  );

  return (
    <React.Fragment>
      <h1 style={{ color: "#1976d2" }}>Sorting App</h1>
      <div className={classes.div2}>
          <h3 style={{ color: "#1976d2", margin: "0 auto" }}>Sort Algorithm</h3>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            disabled={!props.canPlay}
          >
            <Button
              variant={props.algo === "B" ? "contained" : "outlined"}
              value="B"
              onClick={props.setAlgo}
            >
              Bubble Sort
            </Button>
            <Button
              variant={props.algo === "S" ? "contained" : "outlined"}
              value="S"
              onClick={props.setAlgo}
            >
              Selection Sort
            </Button>
            <Button
              variant={props.algo === "I" ? "contained" : "outlined"}
              value="I"
              onClick={props.setAlgo}
            >
              Insertion Sort
            </Button>
            <Button
              variant={props.algo === "M" ? "contained" : "outlined"}
              value="M"
              onClick={props.setAlgo}
            >
              Merge Sort
            </Button>
          </ButtonGroup>
        </div>
      <div className={classes.div}>
        <div className={classes.div2}>
          <h3 style={{ color: "#1976d2", margin: "0 auto" }}>Array Size</h3>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            disabled={!props.canPlay}
          >
            <Button
              variant={props.size === "S" ? "contained" : "outlined"}
              value="S"
              onClick={props.generate}
            >
              S
            </Button>
            <Button
              variant={props.size === "M" ? "contained" : "outlined"}
              value="M"
              onClick={props.generate}
            >
              M
            </Button>
            <Button
              variant={props.size === "L" ? "contained" : "outlined"}
              value="L"
              onClick={props.generate}
            >
              L
            </Button>
            <Button
              variant={props.size === "XL" ? "contained" : "outlined"}
              value="XL"
              onClick={props.generate}
            >
              XL
            </Button>
          </ButtonGroup>
        </div>
        {startOrStopButton}
        <div>
          
        </div>
        <Button
          variant="outlined"
          value="reset"
          onClick={props.reset}
          disabled={!props.started || !props.canPlay}
        >
          Reset Array
          <RotateLeftIcon />
        </Button>
        <div className={classes.div2}>
          <h3 style={{ color: "#1976d2", margin: "0 auto" }}>Sort Speed</h3>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            disabled={!props.canPlay}
          >
            <Button
              value="S"
              onClick={props.speedHandler}
              variant={props.speed === "S" ? "contained" : "outlined"}
            >
              SLOW
            </Button>
            <Button
              value="R"
              onClick={props.speedHandler}
              variant={props.speed === "R" ? "contained" : "outlined"}
            >
              REGULAR
            </Button>
            <Button
              value="F"
              onClick={props.speedHandler}
              variant={props.speed === "F" ? "contained" : "outlined"}
            >
              FAST
            </Button>
            <Button
              value="V"
              onClick={props.speedHandler}
              variant={props.speed === "V" ? "contained" : "outlined"}
            >
              VERY FAST
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
