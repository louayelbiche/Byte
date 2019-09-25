import React from "react";
import "./App.css";
import axios from "axios";
import MessagesList from "./MessagesList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currMessage: ""
    };
    this.connecToServer = this.connecToServer.bind(this);
  }

  connecToServer() {
    var port = process.env.PORT || 5000;
    axios.get("/messages").then(response => {
      let { data } = response;
      this.setState({ messages: data });
    });
  }

  //Fetch messages from db on launch
  componentDidMount() {
    this.connecToServer();
  }

  handleChange = event => {
    this.setState({ currMessage: event.target.value });
  };

  handleSubmit = event => {
    let { currMessage, messages } = this.state;
    var port = process.env.PORT || 5000;
    axios
      .post("/messages", {
        message: currMessage
      })
      .then(response => {
        let { messageID } = response.data;
        let newDate = Date.now();
        let newMessage = {};
        newMessage["id"] = messageID;
        newMessage["messageText"] = currMessage;
        newMessage["timestamp"] = newDate;
        messages.unshift(newMessage);
        this.setState({ messages }); // triggers render()
      });
    this.state.currMessage = "";
    event.preventDefault();
  };

  render() {
    let { currMessage, messages } = this.state;
    return (
      <div className="App">
        <h1>Welcome to the message board!</h1>
        <form id="form" onSubmit={this.handleSubmit}>
          <label>
            Type your message here:
            <input
              id="message"
              value={currMessage}
              onChange={this.handleChange}
            />
            <br />
          </label>
          <input type="submit" id="submit" value="Post" />
        </form>
        <MessagesList messages={messages} />
      </div>
    );
  }
}

export default App;
