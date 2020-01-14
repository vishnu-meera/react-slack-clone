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
import md5 from "md5";
import { Link } from "react-router-dom";
const user_object = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

const Register = props => {
  const [userObject, setUserObject] = useState(user_object);
  const [usersRef] = useState(firebase.database().ref("users"));
  const handleChnage = e => {
    const usr = JSON.parse(JSON.stringify(userObject));
    usr[e.target.name] = e.target.value;
    setUserObject(usr);
  };

  const onFormClick = e => {
    e.preventDefault();
    if (!formInputValidate(userObject)) {
      console.error("form invalid");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(userObject.email, userObject.password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user
          .updateProfile({
            displayName: userObject.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            saveuser(createdUser).then(() => console.log("user Saved"));
            setUserObject(user_object);
          })
          .catch(err => {
            console.error(err);
            setUserObject(user_object);
          });
      })
      .catch(err => {
        console.error(err);
        setUserObject(user_object);
      });
  };

  const saveuser = createdUser => {
    return usersRef.child(createdUser.user.uid).set({
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL
    });
  };
  const formInputValidate = obj => {
    //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      obj.email.length === 0 &&
      obj.password.length < 7 &&
      obj.username.length === 0
    )
      return false;
    if (obj.password !== obj.passwordConfirmation) return false;
    return true; //re.test(String(obj.email).toLowerCase());
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={onFormClick}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              palceholder="username"
              onChange={handleChnage}
              type="text"
              value={userObject.username}
            />
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              palceholder="password confirm"
              onChange={handleChnage}
              type="password"
              value={userObject.passwordConfirmation}
            />
            <Button fluid color="orange" size="large">
              Submit
            </Button>
            <Message>
              Already a user ? <Link to="/login">Login</Link>
            </Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
