import React, { useEffect } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firbase";
import FileModel from "./FileModel";
import uuidv4 from "uuid/v4";
import ProgressBar from "./ProgressBar";

const MessageForm = ({ messagesRef, _user, _channel }) => {
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [model, setModel] = React.useState(false);
  const [uploadState, setUploadState] = React.useState("");
  const [uploadTask, setUploadTask] = React.useState(null);
  const [percentUploaded, setPercentUploaded] = React.useState(0);
  const [storageRef] = React.useState(firebase.storage().ref());

  useEffect(() => {
    if (uploadTask !== null) {
      uploadTask.on(
        "state_changed",
        snap => {
          const percentageUploaded = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setPercentUploaded(percentageUploaded);
        },
        err => {
          console.error(err);
          setUploadState("error");
          setUploadTask(null);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downLoadUrl => {
              sendFileMessage(downLoadUrl);
            })
            .catch(err => {
              console.error(err);
              setUploadState("error");
              setUploadTask(null);
            });
        }
      );
    }
  }, [uploadTask]);

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const openModel = () => setModel(true);
  const closeModel = () => setModel(false);

  const sendFileMessage = fileurl => {
    const errs = JSON.parse(JSON.stringify(errors));
    messagesRef
      .child(_channel.id)
      .push()
      .set({
        image: fileurl,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: _user.uid,
          name: _user.displayName,
          avatar: _user.photoURL
        }
      })
      .then(() => {
        setMessage("");
        setErrors([]);
        setUploadState("done");
        setUploadTask(null);
      })
      .catch(err => {
        console.error(err);
        setMessage("");
        setErrors(errs.concat(err));
        setUploadState("error");
        setUploadTask(null);
      });
  };
  const sendMessage = () => {
    const errs = JSON.parse(JSON.stringify(errors));
    if (message) {
      setLoading(true);
      messagesRef
        .child(_channel.id)
        .push()
        .set({
          content: message,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          user: {
            id: _user.uid,
            name: _user.displayName,
            avatar: _user.photoURL
          }
        })
        .then(() => {
          setMessage("");
          setErrors([]);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setMessage("");
          setErrors(errs.concat(err));
          setLoading(false);
        });
    } else {
      setErrors(errs.concat({ message: "Add a message" }));
    }
  };

  const uploadFile = (metaData, file) => {
    const pathTo = `chat/publi/${uuidv4()}.jpg`;
    setUploadState("uploading");
    setUploadTask(storageRef.child(pathTo).put(file, metaData));
  };

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon={"add"} />}
        labelPosition="left"
        placeholder="write your message..."
        onChange={handleChange}
        className={errors.length > 0 ? "error" : ""}
        value={message}
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add reply"
          labelPosition="left"
          icon="edit"
          onClick={sendMessage}
          disabled={loading}
        />
        <Button
          color="teal"
          content="Upload media"
          labelPosition="right"
          icon="cloud upload"
          disabled={uploadState === "uploading"}
          onClick={openModel}
        />
      </Button.Group>
      <FileModel
        model={model}
        closeModel={closeModel}
        uploadFile={uploadFile}
      />
      <ProgressBar
        uploadState={uploadState}
        percentUploaded={percentUploaded}
      />
    </Segment>
  );
};

export default MessageForm;
