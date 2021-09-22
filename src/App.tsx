import { Card, Container, Form, Image as BImage } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

import * as tf from "@tensorflow/tfjs";

import * as faceapi from "@vladmandic/face-api";

const MODEL_URL = "/models";

const App = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageSelected, setImageSelected] = useState(false);
  const [predictions, setPredictions] = useState<FaceDetection[]>();

  const loadModel = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  };

  useEffect(() => {
    tf.ready().then(() => {
      console.log("starting loading model");
      loadModel();
      console.log("Model loaded!");
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
        setPredictions(await faceapi.detectAllFaces(im));
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
