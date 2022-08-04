import React,  { useEffect, useRef , useState  }  from "react";
import { Camera } from '../camera';
import Measure from "react-measure";
import {useCardRatio} from '../hooks/use-card-ratio';

function MapExample()  {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  return (
    <div>
      {isCameraOpen && (
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}
      <div>
        
        <video  />
      </div>
  
          <button class="btn-open-camera" onClick={() => setIsCameraOpen(true)} >Iniciar camara</button>
          <button onClick={() => {
            setIsCameraOpen(false);
            setCardImage(undefined);}}>Cerrar camara</button>
       
    </div>
  );
};

export default MapExample;
