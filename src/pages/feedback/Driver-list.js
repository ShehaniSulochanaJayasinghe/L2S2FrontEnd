import React from "react";
 import axios from "axios";

export default class DriverList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      selected: props.selected,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/driver").then((res) => {
      const drivers = res.data;
      this.setState({ drivers });
      console.log(res);
    });

  }

  onTrigger = (event) => {
    this.setState({ ...this.state, selected: event.target.value });
    const driver = this.state.drivers.filter(
      (driver) => driver._id === event.target.value
    )[0];
    this.props.parentCallback({ id: event.target.value, name: driver.name });
  };

  render() {
    // return (
    //     <div>
    //       <br></br> <br></br>
    //       <button onClick={this.onTrigger}>Click me</button>
    //     </div>
    //   );

    return (
      <select onChange={this.onTrigger} value={this.state.selected}>
        {this.state.drivers.map((driver) => (
          <option key={driver._id} value={driver._id}>
            {driver.name}
          </option>
        ))}
      </select>
    );
  }
}
