import React, { useRef, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

const MAX_SIZE_IMAGE = 1024; // In pixels

const Canvas: React.FC<{
  predictions: FaceDetection[];
  image: HTMLImageElement;
}> = (props) => {
  const { predictions, image } = props;

  const { height, width } = image;

  let ratio: number;

  let canvasScreenWidth: string;
  let canvasScreenHeight: string;

  if (width / window.innerWidth > height / window.innerHeight) {
    ratio = MAX_SIZE_IMAGE / width;
    canvasScreenWidth = "80vw";
    canvasScreenHeight = "auto";
  } else {
    ratio = MAX_SIZE_IMAGE / height;
    canvasScreenWidth = "auto";
    canvasScreenHeight = "80vh";
  }

  const [observed, setObserved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (observed) {
    const ctx = canvasRef.current!.getContext("2d");

    ctx!.font = "18px serif";
    ctx!.fillStyle = "#ff0000";
    ctx!.strokeStyle = "#ff0000";

    ctx!.drawImage(image, 0, 0, image.width * ratio, image.height * ratio);

    ctx!.beginPath();

    predictions.forEach((element) => {
      ctx!.fillText(
        element.classScore.toFixed(2),
        element.box.x * ratio,
        element.box.y * ratio - 10
      );

      ctx!.rect(
        element.box.x * ratio,
        element.box.y * ratio,
        element.box.width * ratio,
        element.box.height * ratio
      );
    });
    ctx!.stroke();
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        {predictions.length === 0 && <h1>No faces detected</h1>}
      </div>
      <div className="justify-content-center">
        <canvas
          ref={(element) => {
            if (!observed) {
              setObserved(true);
            }
            /* @ts-ignore*/
            canvasRef.current = element;
          }}
          style={{
            width: `${canvasScreenWidth}`,
            height: `${canvasScreenHeight}`,
            marginRight: "auto",
            marginLeft: "auto",
          }}
          width={width * ratio}
          height={height * ratio}
        />
      </div>
    </>
  );
};

export default Canvas;
