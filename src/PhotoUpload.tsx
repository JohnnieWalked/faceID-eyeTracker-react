import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { uploadPhotoActions } from './store/uploadPhotoSlice';

/* styled-components --- */
import { StyledPhotoUpload } from './StyledComponents';

/* icons --- */
import { FiUpload } from 'react-icons/fi';

function PhotoUpload() {
  const dispatch = useDispatch();
  const uploadedPhoto = useSelector(
    (state: RootState) => state.uploadPhoto.uploadedPhoto
  );

  return (
    <StyledPhotoUpload>
      <label htmlFor="file-upload">
        Upload your photo <FiUpload />
      </label>
      <input
        style={{ display: 'none' }}
        id="file-upload"
        accept=".png, .jpeg, .jpg"
        type="file"
        onChange={(e) =>
          e.target.files?.length === 1 &&
          dispatch(
            uploadPhotoActions.uploadPhoto(
              URL.createObjectURL(e.target.files[0])
            )
          )
        }
      />
      {uploadedPhoto ? (
        <img src={uploadedPhoto} alt="Photo of user" />
      ) : (
        <svg
          className="placeholderInput"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
            />
            <ellipse cx="15" cy="10.5" rx="1" ry="1.5" />
            <ellipse cx="9" cy="10.5" rx="1" ry="1.5" />
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M22 14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22m-4 0c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14m8-12C6.229 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10m12-8c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10"
            />
          </g>
        </svg>
      )}
    </StyledPhotoUpload>
  );
}

export default PhotoUpload;
