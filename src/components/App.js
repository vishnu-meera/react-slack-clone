import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import { connect } from "react-redux";
import "./App.css";

const App = ({ user, channel }) => {
  console.log("channel id :", channel && channel.id);
  return (
    <Grid columns="equal" className="app" style={{ background: "white" }}>
      <ColorPanel />
      {user ? (
        <SidePanel key={user.displayName} user={user} />
      ) : (
        <div>loading...</div>
      )}
      <Grid.Column style={{ marginLeft: 320 }}>
        {channel && user ? (
          <Messages key={channel.id} channel={channel} user={user} />
        ) : (
          <div>loading...</div>
        )}
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
  channel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
