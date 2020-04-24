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
  const [wb24, setWb24] = useState([]);

  const elt = useRef();

  useEffect(() => {
    fetch("example.xlsx")
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        //read file
        const wb = XLSX.read(ab, { type: "array", cellStyles: true });
        S5SCalc.update_value(wb, "Sheet1", "C11", 1);
        const html = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]); // first worksheet HTML
        elt.current.innerHTML = html;
        setWb24(wb);
      });
  }, []);

  //change data and reaculculate

  const onScenarioChange = (scenarioNum) => {
    // const wbTemp = { ...wb24 };
    S5SCalc.update_value(wb24, "Sheet1", "C11", scenarioNum);
    S5SCalc.update_value(wb24, "Sheet1", "G19", 100);
    const html = XLSX.utils.sheet_to_html(wb24.Sheets[wb24.SheetNames[0]]); // first worksheet HTML
    elt.current.innerHTML = html;
    console.log(wb24);
    // setWb24({ ...wbTemp });
  };

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
            onScenarioChange(1);
          }}
        >
          {buttonSelectedNum === 1 ? "selected 1" : "select"}
        </Button>
        <Button
          onClick={() => {
            setButtonSelectedNum(2);
            onScenarioChange(2);
          }}
        >
          {buttonSelectedNum === 2 ? "selected 2" : "select"}
        </Button>
        <Button
          onClick={() => {
            setButtonSelectedNum(3);
            onScenarioChange(3);
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
