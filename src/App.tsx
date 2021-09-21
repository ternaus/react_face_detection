import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";

const App = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [isPredicting, setIsPredicting] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  const imageFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageFile((event.target as HTMLInputElement).files![0]);
    setImageSelected(true);
  };

  const detectFaces = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPredicting(isPredicting);
    console.log(imageFile);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Upload an image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={imageFieldChangeHandler}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={detectFaces}
              disabled={!imageSelected}
            >
              Upload
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default App;
