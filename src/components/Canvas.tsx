import React, { useEffect, useRef, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

const Canvas: React.FC<{
  predictions: FaceDetection[];
  image: HTMLImageElement;
}> = (props) => {
  const { predictions, image } = props;

  const [observed, setObserved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    if (!ctx) return;

    ctx.font = "18px serif";
    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#ff0000";
    ctx.drawImage(image, 0, 0);
    ctx.beginPath();

    predictions.forEach((element) => {
      ctx.fillText(
        element.classScore.toFixed(2),
        element.box.x,
        element.box.y - 10
      );

      ctx.rect(
        element.box.x,
        element.box.y,
        element.box.width,
        element.box.height
      );
    });
    ctx.stroke();
  }, [observed]);

  return (
    <canvas
      ref={(element) => {
        setObserved(true);
        // @ts-ignore
        canvasRef.current = element;
      }}
      width={image.width}
      height={image.height}
    />
  );
};

export default Canvas;
