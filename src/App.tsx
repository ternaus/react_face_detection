import {
  Button,
  Card,
  Container,
  Form,
  Image as BImage,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const blazeface = require("@tensorflow-models/blazeface");

const App = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [image, setImage] = useState<HTMLImageElement>();
  const [isPredicting, setIsPredicting] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [model, setModel] = useState();

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

  console.log("RELOADING!");

  const detectFaces = (event: React.MouseEvent<HTMLButtonElement>) => {
    // convert binary data to image object
    const fileReadComplete = (e: any) => {
      const im = new Image();
      im.src = e.target.result;
      (() => {
        if (im.complete) {
          setImage(im);
        }
      })();
    };

    const fileRead = (imgFile: File) => {
      const reader = new FileReader();
      reader.onload = fileReadComplete;
      if (imgFile) {
        reader.readAsDataURL(imgFile);
      }
    };

    setIsPredicting(true);
    console.log("Predicting = ", isPredicting);
    console.log(imageFile);
    fileRead(imageFile!);
    console.log("Checking height, width = ", image?.width, image?.height);

    const predict = async () => {
      const returnTensors = false;
      // @ts-ignore
      const predictions = await model.estimateFaces(image, returnTensors);

      console.log(predictions);
    };

    if (image) {
      predict();
    }
  };

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
            <Button
              variant="primary"
              onClick={detectFaces}
              disabled={!imageSelected}
            >
              Upload
            </Button>
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
