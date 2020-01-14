import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";

import firebase from "../../firbase";

import { Link } from "react-router-dom";
const user_object = {
  email: "",
  password: ""
};

const Login = props => {
  const [userObject, setUserObject] = useState(user_object);

  const handleChnage = e => {
    const usr = JSON.parse(JSON.stringify(userObject));
    usr[e.target.name] = e.target.value;
    setUserObject(usr);
  };

  const onFormClick = e => {
    e.preventDefault();
    if (userObject.email && userObject.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userObject.email, userObject.password)
        .then(signedInUser => {
          console.log(signedInUser);
          setUserObject(user_object);
        })
        .catch(err => {
          console.error(err);
          setUserObject(user_object);
        });
    }
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="black" textAlign="center">
          <Icon name="code branch" color="orange" />
          Login into chat
        </Header>
        <Form size="large" onSubmit={onFormClick}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              palceholder="email"
              onChange={handleChnage}
              type="email"
              value={userObject.email}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              palceholder="password"
              onChange={handleChnage}
              type="password"
              value={userObject.password}
            />

            <Button fluid color="black" size="large">
              Submit
            </Button>
            <Message>
              Not an user? <Link to="/register">Register</Link>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
