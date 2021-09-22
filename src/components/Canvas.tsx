import React, { useRef, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

const Canvas: React.FC<{
  predictions: FaceDetection[];
  image: HTMLImageElement;
}> = (props) => {
  const { predictions, image } = props;

  const [observed, setObserved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (observed) {
    const ctx = canvasRef.current!.getContext("2d");

    ctx!.font = "18px serif";
    ctx!.fillStyle = "#ff0000";
    ctx!.strokeStyle = "#ff0000";

    ctx!.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );

    ctx!.beginPath();

    predictions.forEach((element) => {
      ctx!.fillText(
        element.classScore.toFixed(2),
        element.box.x,
        element.box.y - 10
      );

      ctx!.rect(
        element.box.x,
        element.box.y,
        element.box.width,
        element.box.height
      );
    });
    ctx!.stroke();
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        {predictions.length === 0 && <h1>No faces detected</h1>}
      </div>
      <canvas
        ref={(element) => {
          if (!observed) {
            setObserved(true);
          }
          // @ts-ignore
          canvasRef.current = element;
        }}
        style={{ width: "1024px", height: "auto" }}
        width={image.width}
        height={image.height}
      />
    </>
  );
};

export default Canvas;
