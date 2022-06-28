import { React, useState } from "react";
import "./layout.css";
import AddTrip from "../pages/addTrip";
import EditTrip from "../pages/editTrip";
import AddBookingDaily from "../pages/addBookingsDaily";
import Feedback from "../pages/feedback";
import { Paper, Button } from "@mui/material";

export default function Render(props) {
  const [is, set] = useState(1);
  var paperSx = {
    padding: "10px",
    width: "80%",
    marginBottom: "10px",
    borderRadius: "14px",
    textAlign: "center",
  };

  return (
    <div className="container">
      <section className="left">
        <div style={{ textAlign: "center" }}>
          <h1>Welcome</h1>
        </div>
        <div>
          <div
            className="action_btn"
            onClick={() => {
              set(1);
            }}
          >
            Add Trip
            <span>new</span>
          </div>
          <div
            className="action_btn"
            onClick={() => {
              set(2);
            }}
          >
            Trip Details
            <span>current</span>
          </div>
          <div
            className="action_btn"
            onClick={() => {
              set(3);
            }}
          >
            Go To Main
            <span>current</span>
          </div>
          <Button
            variant="contained"
            onClick={() => {
              set(4);
            }}
          >
            Add Feed BAck
          </Button>
        </div>
      </section>

      <section className="center">
        <Paper sx={paperSx} elevation={8}>
          <h1> {is === 1 ? "Add Trip " : is === 2 ? "Edit Trip" : "list"} </h1>
        </Paper>
        {is === 1 ? (
          <AddTrip />
        ) : is === 2 ? (
          <EditTrip />
        ) : is === 3 ? (
          <AddBookingDaily />
        ) : (
          // <h1>hllo</h1>
          <Feedback />
        )}
      </section>

      {/* <section className="right">
        <header>Add Booking</header>
      </section> */}
    </div>
  );
}
