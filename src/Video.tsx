import { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

/* redux --- */
import { useSelector } from 'react-redux';
import { RootState } from './store';

/* icons & styles --- */
import './styles.scss';
import { SecondaryButton } from './StyledComponents';
import { ImSwitch } from 'react-icons/im';
import { BarLoader } from 'react-spinners';
import { orange } from './variables';

function Video() {
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { userName } = useSelector((state: RootState) => state.userSlice);
  const userPhoto = useSelector(
    (state: RootState) => state.uploadPhoto.uploadedPhoto
  );
  const { isLoading } = useSelector((state: RootState) => state.faceapiSlice);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function handleClick() {
    // if (!userPhoto || !userName) {
    //   return setMessage(
    //     'Photo or Name is missing. Please, check and try again.'
    //   );
    // }
    // setMessage(null);
    setIsActive((state) => !state);
    if (stream) {
      stopVideo();
    } else {
      startVideo().then(() => faceDetection());
    }
  }

  /* start webcam */
  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (error) {
      setMessage(`Error accessing the camera: ${error}`);
    }
  }

  /* stop webcam */
  function stopVideo() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      intervalID ? clearInterval(intervalID) : null;
    }
  }

  function faceDetection() {
    if (!videoRef.current || !canvasRef.current)
      return setMessage('Oops, something went wrong!');
    const canvas = canvasRef.current;
    canvas.focus();
    const context = canvas.getContext('2d');
    const displaySize = {
      width: videoRef.current.clientWidth,
      height: videoRef.current.clientHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    const detectionInterval: NodeJS.Timeout = setInterval(async () => {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current!,
          new faceapi.SsdMobilenetv1Options()
        )
        .withFaceExpressions();
      context!.clearRect(0, 0, canvas.width, canvas.height);
      const resizedDetections = faceapi.resizeResults(detection, displaySize);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
    setIntervalID(detectionInterval);
  }

  return (
    <div className="videoWrapper">
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} />

      <div className="videoWrapper_notification">
        <SecondaryButton
          onClick={handleClick}
          $isActive={isActive}
          $userPhoto={userPhoto}
          $userName={userName}
        >
          <ImSwitch />
        </SecondaryButton>

        {message && (
          <span className="text text_error">
            Failure. <br /> {message}
          </span>
        )}

        {isLoading && (
          <span className="text text_load">
            <BarLoader color={orange} />
            Loading models...
          </span>
        )}
      </div>
    </div>
  );
}

export default Video;
