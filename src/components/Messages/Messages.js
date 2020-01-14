import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import firebase from "../../firbase";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messageLoading: true,
    channel: this.props.channel,
    user: this.props.user
  };

  componentDidMount() {
    if (this.state.user && this.state.channel) {
      this.addListeners(this.state.channel.id);
    }
  }

  addListeners = channelId => {
    const { messagesRef } = this.state;
    let messages = [];
    console.log("channelId ", channelId);
    messagesRef.child(channelId).on("child_added", snap => {
      messages.push(snap.val());
      this.setState({
        messages: messages,
        messageLoading: false
      });
      this.countUniqueUsers(messages);
      console.log("messages ", this.state.messages, this.state.messageLoading);
    });
  };

  displayMessages = (messages, loading) => {
    return loading
      ? messages.length === 0(<div>loading...</div>)
      : messages.map(message => (
          <Message
            message={message}
            key={message.timestamp}
            user={this.state.user}
          />
        ));
  };

  countUniqueUsers = messages => {
    const users = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);

    const numOfUsers =
      users.length > 1 ? `${users.length} users` : `${users.length} user`;
    this.setState({ noOfUsers: numOfUsers });
  };

  render() {
    const { messagesRef, messages, channel, user } = this.state;
    return (
      <React.Fragment>
        <MessageHeader _channel={channel} noOfUsers={this.state.noOfUsers} />
        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          messagesRef={messagesRef}
          _user={user}
          _channel={channel}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
