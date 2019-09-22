import React from "react";
import "./App.css";

function MessagesList(props) {
  let list = props.content.map((entry, i) => (
    <li>
      {entry[0]} {entry[1]}
    </li>
  ));

  return <div>{list}</div>;
}

export default MessagesList;
