import React, { useState } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firbase";

const UserPanel = ({ user }) => {
  const [currentUser] = useState(user);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
      });
  };

  const dropdownOptions = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{currentUser && currentUser.displayName}</strong>
        </span>
      ),
      disable: "true"
    },
    { key: "avatar", text: <span>Change avatar</span> },
    {
      key: "logout",
      text: <span onClick={handleSignOut}>Logout</span>
    }
  ];

  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1em", margin: 0 }}>
          <Header inverted floated="left" as="h3">
            <Icon name="code" />
            <Header.Content>Chat</Header.Content>
          </Header>
        </Grid.Row>
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown
            trigger={
              <span>
                <Image src={currentUser.photoURL} spaced="right" avatar />
                {currentUser.displayName}
              </span>
            }
            options={dropdownOptions}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
