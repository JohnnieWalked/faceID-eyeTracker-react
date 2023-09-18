import { useDispatch } from 'react-redux';
import { userActions } from './store/userSlice';

/* styled-components --- */
import { StyledSelectExpression } from './StyledComponents';

function ExpressionSelect() {
  const dispatch = useDispatch();

  const handleChange = (expressionValue: string) => {
    dispatch(userActions.setUserExpression(expressionValue));
  };

  return (
    <StyledSelectExpression>
      <label htmlFor="face-expression">
        Choose face expression for additional security:
      </label>
      <select
        onChange={(e) => handleChange(e.target.value)}
        name="face-expression"
        id="face-expression"
      >
        <option value="">None</option>
        <option value="Surprised">Surprised</option>
        <option value="Happy">Happy</option>
        <option value="Fearful">Fearful</option>
        <option value="Disgusted">Disgusted</option>
        <option value="Sad">Sad</option>
        <option value="Angry">Angry</option>
      </select>
    </StyledSelectExpression>
  );
}

export default ExpressionSelect;
