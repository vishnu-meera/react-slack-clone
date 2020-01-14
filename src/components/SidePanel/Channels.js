import React, { useState, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { setCurrentChanel } from "../../actions";
import firebase from "../../firbase";

const tempChanel = {
  channelDetails: "",
  channelName: ""
};

const Channels = ({ user, setCurrentChanel }) => {
  const [ref] = useState(firebase.database().ref("channels"));
  const [currentUser] = useState(user);
  const [chnls, setChnls] = useState([]);
  const [model, setModel] = useState(false);
  const [chanel, setChanel] = useState(tempChanel);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChannel, setActiveChannel] = useState("");

  const handleOnClose = () => {
    setChanel(tempChanel);
    setModel(false);
  };

  const openChanelModal = () => setModel(true);

  const handleChange = e => {
    const c = JSON.parse(JSON.stringify(chanel));
    c[e.target.name] = e.target.value;
    setChanel(c);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid(chanel)) {
      addChanel();
    }
  };

  const isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  const addChanel = () => {
    const key = ref.push().key;
    //const temp = JSON.parse(JSON.stringify(chnls));
    const newChannel = {
      id: key,
      name: chanel.channelName,
      details: chanel.channelDetails,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    };
    ref
      .child(key)
      .update(newChannel)
      .then(() => {
        //temp.push(newChannel);
        handleOnClose();
        console.log("chanel added");
        //setChnls(temp);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadChannels();
    return () => ref.off();
  }, []);

  const loadChannels = async () => {
    const loadChanels = [];
    ref.once("value").then(snapshot => {
      const snap = snapshot.val();
      Object.keys(snap).forEach(key => {
        loadChanels.push(snap[key]);
      });
      setChnls(loadChanels);
      setFirstChannel(loadChanels);
    });
  };

  const changeChanel = chanel => {
    setCurrentChanel(chanel);
    handlActiveChannel(chanel);
  };

  const setFirstChannel = loadChanels => {
    if (firstLoad && loadChanels.length > 0) {
      setCurrentChanel(loadChanels[0]);
      handlActiveChannel(loadChanels[0]);
    }
    setFirstLoad(false);
  };

  const handlActiveChannel = chanel => {
    setActiveChannel(chanel.id);
  };

  return (
    <React.Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>{" "}
          ({chnls.length})<Icon name="add" onClick={openChanelModal} />
        </Menu.Item>
        {chnls.length &&
          chnls.map(obj => (
            <Menu.Item
              key={obj.id}
              name={obj.name}
              style={{ opacity: 0.7 }}
              onClick={() => changeChanel(obj)}
              active={obj.id === activeChannel}
            >
              # {obj.name}
            </Menu.Item>
          ))}
      </Menu.Menu>
      <Modal basic open={model} onClose={handleOnClose}>
        <Modal.Header>Add a Chanel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name a channel"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the channel"
                name="channelDetails"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={handleOnClose}>
            <Icon name="remove" /> remove
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default connect(null, { setCurrentChanel })(Channels);
