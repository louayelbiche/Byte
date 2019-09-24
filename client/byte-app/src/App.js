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
  }

  //Fetche messages from db on launch
  async componentDidMount() {
    axios.get("http://localhost:9000/messages").then(response => {
      let { data } = response;
      this.setState({ messages: data });
      console.log("Messages", data);
    });
  }

  handleChange = event => {
    this.setState({ currMessage: event.target.value });
  };

  handleSubmit = event => {
    let { currMessage, messages } = this.state;
    axios
      .post("http://localhost:9000/messages", {
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
    event.preventDefault();
  };

  render() {
    let { currMessage, messages } = this.state;
    return (
      <div className="App">
        <h1>Welcome to the message board!</h1>
        <form onSubmit={this.handleSubmit}>
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
        {/* Display messages in unordered list */}
        <MessagesList messages={messages} />
      </div>
    );
  }
}

export default App;
