import React from "react";
import "./App.css";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    let { messages } = this.props;
    return messages.map((entry, index) => {
      const { timestamp, messageText } = entry; //destructuring
      let date = String(new Date(timestamp)).slice(0, 24);
      return (
        <tr key={index}>
          <td>{date}</td>
          <td>{messageText}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h4 id="title">Recent messages</h4>
        <table id="messages">
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default MessagesList;
