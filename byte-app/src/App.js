import React from "react";
import "./App.css";
import axios from "axios";
import MessagesList from "./MessagesList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [1, 2],
      currMessage: ""
    };
  }

  //TODO: componentDidMount fetches messages from db

  componentDidMount() {
    axios.get("http://localhost:9000/messages").then(this.displayMessages());
  }

  // // ensures function return a promise
  // handleChange = async(event) => {
  //   // halts this code until the promise
  //   await this.setState({ currMessage: event.target.value }, () =>
  handleChange = event => {
    this.setState({ currMessage: event.target.value }, () =>
      console.log(this.state.currMessage)
    );
  };

  handleSubmit = event => {
    console.log("this.state: ", this.state.currMessage);
    axios
      .post("http://localhost:9000/messages", {
        message: this.state.currMessage
      })
      .then(this.displayMessages());
    event.preventDefault();
  };

  displayMessages() {
    return response => {
      console.log("submit response: ", response.data);
      let msgArray = Object.keys(response.data).map(key => {
        return [key, response.data[key].msg_text];
      });
      this.setState({ messages: msgArray.reverse() }, () =>
        console.log(this.state.messages)
      );
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the message board!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Type your message here:
            <input
              id="message"
              value={this.state.currMessage}
              onChange={this.handleChange}
            />
            <br />
          </label>
          <input type="submit" id="submit" value="Submit" />
        </form>
        {/* {JSON.stringify(this.state.messages)} */}
        <MessagesList content={this.state.messages} />
      </div>
    );
  }
}

export default App;
