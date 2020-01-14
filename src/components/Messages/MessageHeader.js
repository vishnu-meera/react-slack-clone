import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";

const MessageHeader = ({ _channel, noOfUsers }) => {
  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginLeft: 0 }}>
        <span>
          {_channel.name} <Icon name={"star outline"} color="black" />
        </span>
        <Header.Subheader>{noOfUsers}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="search message"
        />
      </Header>
    </Segment>
  );
};

export default MessageHeader;
