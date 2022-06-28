import {
  Card,
  Button,
  Typography,
  CardContent,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HaltTable } from "../../components";

import React from "react";
const Title = styled.span`
  font-size: 0.9em;
  text-align: center;
  background: "grey";
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  margin: 2px 0px;
  display: block;
`;

export default class EditTrip extends React.Component {
  loder = null;
  text = null;
  haltReq = [];
  constructor(props) {
    super(props);
    this.loder = React.createRef();
    this.text = React.createRef();
    this.state = {
      step: 0,
      selected: "hell",
      data: [],
      halts: {},
    };
  }
  // /:id/hault/get-all
  componentDidMount() {
    var loder = this.loder;
    var text = this.text;
    text.current.innerHTML = "Loading.......";
    fetch("http://127.0.0.1:3001/trip/get-all", {
      method: "get",
    })
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        loder.current.style.display = "none";
        this.setState({ data: actualData });
      })
      .catch((e) => {
        text.current.innerHTML = "Please Check Your Connection";
        console.error(e);
      });
  }

  render() {
    var loder_styles = {
      position: "absolute",
      zIndex: 2,
      background: "#ebedee",
      overflow: "hidden",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "96%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    var styles = {
      width: "80%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      alignItems: "center",
      minHeight: "300px",
    };

    return (
      <div style={styles}>
        <Stack spacing={2}>
          {this.state.data.map((e) => (
            <Card
              key={e._id}
              sx={{
                display: "inline-flex",
                borderRadius: "20px",
                padding: "5px",
                margin: "5px 3px",
                mixWeight: "800px",
              }}
            >
              <CardContent>
                <p style={{ fontSize: "20px" }}>
                  <b>* {e.name}</b>
                  <br />
                  <Title>{e.startTime}</Title>
                  <Title>{e.repeat}</Title>
                </p>
              </CardContent>
              <CardContent>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Show Halts</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <HaltTable id={e._id} name={e.name} data={e}></HaltTable>
                  </AccordionDetails>
                </Accordion>
                <Button
                  sx={{ float: "right", mt: 2 }}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <div ref={this.loder} className="loder" style={loder_styles}>
          <img
            src="https://i.pinimg.com/originals/6e/c8/fa/6ec8fa35800b339aa060d70d67edcf03.gif"
            alt="loading"
            width="300px"
          />
          <h1 ref={this.text}>Loading ........</h1>
        </div>
      </div>
    );
  }
}
