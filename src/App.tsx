import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import "@tensorflow/tfjs-backend-webgl";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const blazeface = require("@tensorflow-models/blazeface");

const App = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [image, setImage] = useState<HTMLImageElement>();
  const [isPredicting, setIsPredicting] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);

  const imageFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageFile((event.target as HTMLInputElement).files![0]);
    setImageSelected(true);
  };

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
    console.log(image?.width, image?.height);

    const predict = async () => {
      const model = await blazeface.load();
      const returnTensors = false;
      const predictions = await model.estimateFaces(image, returnTensors);
      console.log(predictions);
    };

    if (image) {
      predict();
    }
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
