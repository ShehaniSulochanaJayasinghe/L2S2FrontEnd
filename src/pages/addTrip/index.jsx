import React from "react";
import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import One from "./one";
import Two from "./two";
import Three from "./three";

export default class AddTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      name: "",
      from: new Date(),
      to: new Date(),
      time: new Date(),
      halts: [],
      repeat: "daily",
      vehicle: "",
      errors: {},
    };
  }

  onSubmit = () => {
    const data = this.state;
    const haltReq = [];
    fetch("http://127.0.0.1:3001/trip/add/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        vehicleId: data.vehicle,
        startTime: data.time,
        repeat: data.repeat,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        window.alert("Sucesss Full");
        const a = jsonResponse._id;
        data.halts.map((e) => {
          haltReq.push(this.submitHalt(a, e.name, e.time, e.long, e.lat));
          return e;
        });

        Promise.all(haltReq)
          .then((res) => {
            console.log("promise all", res);
          })
          .catch((e) => {
            window.alert("FAiled Try Again");
          });
      })
      .catch((e) => {
        console.error(e);
        window.alert("Booking Failed Someting Went Wrong");
      });
  };

  submitHalt(id, name, time, long, lat) {
    return fetch(`http://127.0.0.1:3001/trip/${id}/hault/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        timeSinceTripStart: time,
        location: { longitude: long, latitude: lat },
      }),
    });
  }

  onAddhalt = (halt) => {
    console.log("halts", halt);
    this.setState({ halts: [...this.state.halts, halt] });
    console.log(this.state.halts);
  };
  onSelectDriver = (id) => {
    console.log("driver = ", id);
    this.setState({ vehicle: id });
  };

  btnClickHandlerNext = (event) => {
    const step = this.state.step;
    this.setState({ step: step + 1 });
  };
  btnClickHandlerPre = (event) => {
    const step = this.state.step;
    this.setState({ step: step - 1 });
  };

  calanderHandleFrom = (value) => {
    this.setState({ from: value });
  };
  calanderHandleTo = (value) => {
    this.setState({ to: value });
  };
  clockHandle = (value) => {
    this.setState((pre) => (pre.time = new Date(value)));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {});
  };

  formRender() {
    const { step } = this.state;
    var func = {
      handleChange: this.handleChange,
      calanderHandleTo: this.calanderHandleTo,
      calanderHandleFrom: this.calanderHandleFrom,
      clockHandle: this.clockHandle,
    };

    var func2 = {
      onSelectDriver: this.onSelectDriver,
    };
    if (step === 0) {
      return <One state={this.state} {...func} />;
    } else if (step === 1) {
      return <Two {...func2} />;
    } else {
      return <Three state={this.state} onAddhalt={this.onAddhalt} />;
    }
    //
  }

  render() {
    var inStyles = {
      maxHeight: "500px",
      overflow: "auto",
      padding: "10px",
      position: "relative",
    };
    return (
      <>
        <div style={inStyles}>
          {this.formRender()}
          <div className="btn_grp" style={{ marginTop: "10px" }}>
            {this.state.step > 0 && (
              <Button
                sx={{ float: "left", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.btnClickHandlerPre}
                endIcon={<NavigateNextIcon />}
              >
                Back
              </Button>
            )}
            {this.state.step < 2 && (
              <Button
                sx={{ float: "right", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.btnClickHandlerNext}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            )}
            {this.state.step === 2 && (
              <Button
                sx={{ float: "right", backgroundColor: "yellow" }}
                variant="contained"
                onClick={this.onSubmit}
                endIcon={<NavigateNextIcon />}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
}
