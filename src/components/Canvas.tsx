import React, { useRef, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

const Canvas: React.FC<{
  predictions: FaceDetection[];
  image: HTMLImageElement;
}> = (props) => {
  const { predictions, image } = props;

  const maxImageSize = Math.max(image.width, image.height);
  const maxCanvasSize = 800;

  const canvasHeight = Math.round(
    maxCanvasSize * (image.height / maxImageSize)
  );
  const canvasWidth = Math.round(maxCanvasSize * (image.width / maxImageSize));

  const [observed, setObserved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (observed) {
    const ctx = canvasRef.current!.getContext("2d");

    ctx!.font = "18px serif";
    ctx!.fillStyle = "#ff0000";
    ctx!.strokeStyle = "#ff0000";

    const hRatio = canvasRef.current!.height / image.width;
    const vRatio = canvasRef.current!.width / image.height;

    const ratio = Math.min(hRatio, vRatio);

    ctx!.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width * ratio,
      image.height * ratio
    );

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
      <div className="d-flex justify-content-center">
        <canvas
          ref={(element) => {
            if (!observed) {
              setObserved(true);
            }
            // @ts-ignore
            canvasRef.current = element;
          }}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </>
  );
};

export default Canvas;
