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
  const [isError, setIsError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { userName } = useSelector((state: RootState) => state.userSlice);
  const userPhoto = useSelector(
    (state: RootState) => state.uploadPhoto.uploadedPhoto
  );
  const { isLoading } = useSelector((state: RootState) => state.faceapiSlice);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function handleClick() {
    if (!userPhoto || !userName) {
      return setIsError(
        'Photo or Name is missing. Please, check and try again.'
      );
    }
    setIsActive((state) => !state);
    stream ? stopVideo() : startVideo();
    setInterval(async () => {
      if (!videoRef.current) return console.log('ERROR');
      await faceapi
        .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options())
        .withFaceExpressions();
      // console.log(detections);
    }, 100);
    setIsError(null);
  }

  /* start webcam */
  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (error) {
      setIsError(`Error accessing the camera: ${error}`);
    }
  }

  /* stop webcam */
  function stopVideo() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  }

  return (
    <div className="videoWrapper">
      <video ref={videoRef} autoPlay muted></video>
      <div className="videoWrapper_notification">
        <SecondaryButton
          onClick={handleClick}
          $isActive={isActive}
          $userPhoto={userPhoto}
          $userName={userName}
        >
          <ImSwitch />
        </SecondaryButton>
        {isError && (
          <span className="text text_error">
            Failure. <br /> {isError}
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
