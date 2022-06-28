import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";

export default class Two extends React.Component {
  loder = React.createRef();
  text = React.createRef();
  constructor(props) {
    super(props);
    this.loder = React.createRef();
    this.text = React.createRef();
    this.state = {
      data: [],
      open: false,
      selected: null,
    };
  }


  handleClose = () => this.setState({ open: false });
  onSelect = (event) => {
    this.setState({ selected: event });
    this.props.onSelectDriver(event);
  };

  componentDidMount() {
    var loder = this.loder;
    var text = this.text;

    text.current.innerHTML = "Loading.......";
    fetch("http://127.0.0.1:3001/vehicle", {
      method: "get",
    })
      .then((res) => res.json())
      .then((actualData) => {
        loder.current.style.display = "none";
        this.setState({ data: actualData });
      })
      .catch((e) => {
        console.error(e);
        text.current.innerHTML = "Please Check Your Connection";
      });
  }

  render() {
    var vehicle_styles = {
      width: "80%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      alignItems: "center",
      minHeight: "300px",
    };
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
    const data = this.state.data;

    return (
      <>
        <h1>Selecct Your Vehicle</h1>
        <section className="vehicle_list" style={vehicle_styles}>
          <span name="test"></span>

          {data.map((e) => (
            <Card
              key={e._id}
              id={e._id}
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
                  {e.carModel} - type:{e.type}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  sheets - {e.sheets}
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
      </>
    );
  }
}
