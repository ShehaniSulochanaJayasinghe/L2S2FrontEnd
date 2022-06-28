import React from "react";
import { Paper } from "@mui/material";
import {
  Card,
  Button,
  CardMedia,
  Typography,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";



import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default class AddBookingDaily extends React.Component {
  loder = null;
  text = null;
  constructor(props) {
    super(props);
    this.loder = React.createRef();
    this.text = React.createRef();
    this.state = {
      step: 0,
      selected: "hell",
      data: [],
      range: 1000,
      time: "",
      long: 0.0,
      lat: 0.0,
    };
  }

  onSubmit = () => { };
  find = (e) => {
    const { range, time, long, lat } = this.state;
    var loder = this.loder;
    var text = this.text;
    text.current.innerHTML = "Loading.......";
    var url = new URL(
      "http://127.0.0.1:3001/trip/search"
    );
    var data = {
      maxDistance: range,
      [time]: time,
      longitude: long,
      latitude: lat,
    };
    for (let k in data) {
      url.searchParams.append(k, data[k]);
    }
    console.log(url);
    fetch(url, {
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
  };

  componentDidMount() { }

  onSelect = (e) => {
    this.setState({ selected: e });
  };

  clockHandle = (value) => {
    this.setState((pre) => (pre.time = new Date(value)));
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };

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
      <>
        <Paper
          sx={{
            p: 1,
            mb: 3,
            display: "flex",
            alignItems: "baseline",
            borderRadius: 6,
            justifyContent: "flex-start",

            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            id="outlined-basic"
            label="time"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="range"
            name="range"
            value={this.state.range}
            onChange={this.handleChange}
            type={"number"}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={this.state.long}
            name="long"
            label="long"
            type={"number"}
            onChange={this.handleChange}
            placeholder="0.000000"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={this.state.lat}
            onChange={this.handleChange}
            placeholder="0.000000"
            name="lat"
            label="lat"
            type={"number"}
            variant="outlined"
          />

          <Button variant="contained" onClick={this.find}>
            Search
          </Button>
        </Paper>

        <section className="vehicle_list" style={styles}>
          {this.state.data.map((e) => (
            <Card
              key={e._id}
              onClick={() => {
                this.onSelect(e._id);
              }}
              sx={{
                display: "inline-flex",
                borderRadius: "20px",
                padding: "5px",
                margin: "5px 0px",
                mixWeight: "800px",
                background: this.state.selected === e._id ? "green" : "white",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151, padding: "10px" }}
                image="https://icon-library.com/images/vehicle-icon-png/vehicle-icon-png-16.jpg"
                alt="Live from space album cover"
              />
              <Divider orientation="vertical" />
              <CardContent>
                <Typography variant="h5">{e.name}</Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  time : {new Date((e.time/60)).toTimeString() }
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {e.repeat}
                </Typography>
              </CardContent>
              <Divider orientation="vertical" flexItem />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {e.vehicle.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Car Number - {e.vehicle.carNumber}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <div ref={this.loder} className="loder" style={loder_styles}>
            <img
              src="https://i.pinimg.com/originals/6e/c8/fa/6ec8fa35800b339aa060d70d67edcf03.gif"
              alt="loading"
              width="300px"
            />
            <h1 ref={this.text}>Loading ........</h1>
          </div>
        </section>

        {/* {this.state.step > 0 && (
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
        )} */}

        {this.state.step === 0 && (
          <Button
            sx={{ float: "right", backgroundColor: "yellow" }}
            variant="contained"
            onClick={this.onSubmit}
            endIcon={<NavigateNextIcon />}
          >
            Confirm
          </Button>
        )}
      </>
    );
  }
}
