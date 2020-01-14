import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Icon, Button } from "semantic-ui-react";

const FileModel = ({ model, closeModel, uploadFile }) => {
  const [file, setFile] = useState(null);

  const addFile = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const sendFile = () => {
    if (file !== null) {
      const metaData = { contentType: mime.lookup(file.name) };
      uploadFile(metaData, file);
      setFile(null);
      closeModel();
    }
  };
  return (
    <Modal basic open={model} onClose={closeModel}>
      <Modal.Header>Select a file</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="FileTypes : jpg,png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <Icon name="checkmark" />
          Send
        </Button>
        <Button color="red" inverted onClick={closeModel}>
          <Icon name="remove" />
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModel;
