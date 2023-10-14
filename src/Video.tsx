import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

/* redux --- */
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { loadLabeledFaceDescriptors } from './store';

/* icons & styles --- */
import './styles.scss';
import { MainButton, SecondaryButton } from './StyledComponents';
import { ImSwitch } from 'react-icons/im';
import { BarLoader } from 'react-spinners';
import { orange } from './variables';

function Video() {
  const dispatch = useDispatch<AppDispatch>();
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [continueMsg, setContinueMsg] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [labeledDescriptors, setLabeledDescriptors] =
    useState<faceapi.LabeledFaceDescriptors | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { userName, userExpression, userArea } = useSelector(
    (state: RootState) => state.userSlice
  );
  const userPhoto = useSelector(
    (state: RootState) => state.uploadPhoto.uploadedPhoto
  );
  const { isLoading, isLoadingImage } = useSelector(
    (state: RootState) => state.faceapiSlice
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* loading (promise) image */
  useEffect(() => {
    if (!userPhoto || !userName) return;
    dispatch(
      loadLabeledFaceDescriptors({ userPhoto: userPhoto, userName: userName })
    )
      .unwrap()
      .then((data) => setLabeledDescriptors(data));
  }, [userPhoto, userName, dispatch]);

  /* handle button click */
  function handleClick() {
    if (!userPhoto || !userName)
      return setErrorMsg(
        'Photo or Name is missing. Please, check and try again.'
      );

    setErrorMsg(null);
    setIsActive((state) => !state);

    if (stream) {
      stopVideo();
    } else {
      startVideo().then(() => faceDetection());
    }
  }

  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (error) {
      setErrorMsg(`Error accessing the camera: ${error}`);
    }
  }

  function stopVideo() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
      intervalID ? clearInterval(intervalID) : null;
    }
  }

  function faceDetection() {
    if (!videoRef.current || !canvasRef.current) {
      return setErrorMsg('Oops, something went wrong...');
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const displaySize = {
      width: videoRef.current.clientWidth,
      height: videoRef.current.clientHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    if (!labeledDescriptors) {
      return setErrorMsg('Please, wait until program analyzed Your photo.');
    }

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

    const detectionInterval: NodeJS.Timeout = setInterval(async () => {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current!,
          new faceapi.SsdMobilenetv1Options()
        )
        .withFaceLandmarks()
        .withFaceDescriptor()
        .withFaceExpressions();
      context!.clearRect(0, 0, canvas.width, canvas.height);
      const resizedDetection = faceapi.resizeResults(detection, displaySize);

      if (!resizedDetection) return setErrorMsg('Oops, something went wrong!');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const faceExpressions: any = resizedDetection.expressions;

      const result = faceMatcher.findBestMatch(resizedDetection.descriptor);

      if (result.label === userName) {
        if (
          userExpression &&
          faceExpressions[userExpression.toLowerCase()] > 0.9
        ) {
          if (userArea) {
            setContinueMsg(true);
          } else {
            setSuccess('Identification successful!');
          }
        }
        if (
          userExpression &&
          faceExpressions[userExpression.toLowerCase()] < 0.9
        ) {
          setSuccess(null);
        } else if (!userExpression && !userArea) {
          setSuccess('Identification successful!');
        } else if (userArea && !userExpression) {
          setContinueMsg(true);
        }
      } else {
        setSuccess(null);
      }

      const box = resizedDetection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
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

        {errorMsg && (
          <span className="text text_error">
            Failure. <br /> {errorMsg}
          </span>
        )}

        {success && <span className="text text_success">{success}</span>}

        {continueMsg && (
          <MainButton
            onClick={() => {
              intervalID && clearInterval(intervalID);
              localStorage.setItem('XY-ID', JSON.stringify(userArea));
            }}
          >
            <a href="https://johnniewalked.github.io/faceID-eyeTracker-2phase/">
              Continue identification
            </a>
          </MainButton>
        )}

        {isLoading && (
          <span className="text text_load">
            <BarLoader color={orange} />
            Loading models...
          </span>
        )}

        {isLoadingImage && (
          <span className="text text_load">
            <BarLoader color={orange} />
            Loading &amp; analyzing image...
          </span>
        )}
      </div>
    </div>
  );
}

export default Video;
