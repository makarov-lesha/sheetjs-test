import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

import S5SCalc from "@sheet/formula";
import XLSX from "xlsx";
S5SCalc.XLSXLib = XLSX;

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },
  buttonGroup1: {
    marginTop: "10px",
  },
  buttonSelected: {},
}));

function App() {
  const classes = useStyles();
  const [buttonSelectedNum, setButtonSelectedNum] = useState(1);
  const elt = useRef();

  useEffect(() => {
    fetch("example.xlsx")
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        //read file
        const wb = XLSX.read(ab, { type: "array", cellStyles: true });

        //change data and reaculculate
        S5SCalc.update_value(wb, "Sheet1", "C11", buttonSelectedNum);

        //assign to html text
        const html = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]); // first worksheet HTML
        elt.current.innerHTML = html;
      });
  });

  return (
    <div className={classes.App}>
      <Typography variant="h3" style={{ marginTop: "10px" }}>
        Testing SheetJS
      </Typography>
      <ButtonGroup
        color="primary"
        className={classes.buttonGroup1}
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => {
            setButtonSelectedNum(1);
          }}
        >
          {buttonSelectedNum === 1 ? "selected 1" : "select"}
        </Button>
        <Button
          onClick={() => {
            setButtonSelectedNum(2);
          }}
        >
          {buttonSelectedNum === 2 ? "selected 2" : "select"}
        </Button>
        <Button
          onClick={() => {
            setButtonSelectedNum(3);
          }}
        >
          {buttonSelectedNum === 3 ? "selected 3" : "select"}
        </Button>
      </ButtonGroup>
      <Typography style={{ marginTop: "10px" }}>
        Selected index: {buttonSelectedNum}
      </Typography>
      <div ref={elt} />
    </div>
  );
}

export default App;
