import React from "react";
// eslint-disable-next-line
import { Rate, Form, Input, Button } from 'antd';
// eslint-disable-next-line
import "antd/dist/antd.css";
import axios from 'axios';
import DriverList from "./Driver-list";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '62b8928035adbc42037d8a77',
      driverId: '',
      driverName:''
    }
  }

  handleChange = (values) => {
    //this.setState({ ...this.state, [event.target.name]: event.target.value });
    console.log(values)
  }

  handleSubmit = (values) => {
    const feedback = {
      name:values.name,
      comment:values.comment,
      email: values.email,
      rating: values.rating,
      userId: this.state.userId,
      driverId: this.state.driverId
    };
    console.log(JSON.stringify(feedback))
    axios.post('http://localhost:3001/feedback/add', feedback )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }


  handleCallback = (childData) => {
    this.setState({ ...this.state,driverId: childData.id, driverName:childData.name })
  }


  render() {
    //Form with star rating
    const { TextArea } = Input;
    const Demo = (props) => {
      const { driverName } = this.state;

      return (
        <div style={{width:"100%"}}>
          <h1> {driverName}</h1>

          <Form onFinish={this.handleSubmit}

            name="basic"
            initialValues={{ remember: true }}

          >
            <div>
              <h3>Please select your fav driver {"\u2728"}</h3>
              <DriverList parentCallback={this.handleCallback} selected={this.state.driverId} />

              <br></br>
            </div>

            <Form.Item
              label="Name"
              name='name'
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <TextArea rows={1} />
            </Form.Item>


            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: 'Please enter your comment!' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating star"

            >

              <Rate allowHalf defaultValue={2.5} />
            </Form.Item>
            <Form.Item
              label="Enter your Rating level as a number in between 1-5"
              name="rating"
              rules={[{ required: true, message: 'Please enter your rate level!' }]}
            >
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item>
              <Button className="btn" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    };
    return (
      <div className="MainDiv">
        <div className="jumbotron text-center">
          <h3>FEEDBACK FOR US<br>
          </br>Give your feedback</h3>
        </div>

        <div>

          <Demo/>
        </div>
      </div>
    );
  }
}
export default App;