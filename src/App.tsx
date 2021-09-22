import { Card, Container, Form, Image as BImage } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const blazeface = require("@tensorflow-models/blazeface");

const App = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageSelected, setImageSelected] = useState(false);
  const [model, setModel] = useState();
  const [predictions, setPredictions] = useState();

  const loadModel = async () => {
    setModel(await blazeface.load());
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  const imageFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageFile((event.target as HTMLInputElement).files![0]);
    setImageSelected(true);
  };

  const detectFaces = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const im = new Image();
      im.src = e.target.result;
      im.onload = async () => {
        const returnTensors = false;
        // @ts-ignore
        setPredictions(await model.estimateFaces(im, returnTensors));
      };
    };
    reader.readAsDataURL(imageFile);
  };

  useEffect(() => detectFaces(), [imageFile]);

  console.log(predictions);

  return (
    <Container>
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
          </Form>
          {imageSelected && (
            <BImage src={URL.createObjectURL(imageFile!)} fluid />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
