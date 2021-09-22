import React, { useEffect, useRef, useState } from "react";
import { FaceDetection } from "@vladmandic/face-api";

const Canvas: React.FC<{
  predictions: FaceDetection[];
  image: HTMLImageElement;
}> = (props) => {
  const { predictions, image } = props;

  const [observed, setObserved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasWidth = predictions[0].imageWidth;
  const canvasHeight = predictions[0].imageHeight;

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    ctx!.drawImage(image, 0, 0);
  }, [observed]);

  return (
    <canvas
      ref={(element) => {
        setObserved(true);
        // @ts-ignore
        canvasRef.current = element;
      }}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

export default Canvas;
