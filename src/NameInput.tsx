import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from './store/userSlice';

/* styled-components --- */
import { StyledNameInput } from './StyledComponents';

function NameInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue.trim());
  };

  /* debounce */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(userActions.setUserName(inputValue));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  return (
    <StyledNameInput>
      Your name:
      <input
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Example: John Smith"
        type="text"
      />
    </StyledNameInput>
  );
}

export default NameInput;
