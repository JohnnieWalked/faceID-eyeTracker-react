import { createPortal } from 'react-dom';
import { useEffect } from 'react';

/* redux --- */
import { useDispatch } from 'react-redux';
import { userActions } from './store/userSlice';

/* styled-components --- */
import { StyledSquaresWrapper } from './StyledComponents';

/* icons and styles --- */
import './styles.scss';

type AreaSelectionProps = {
  handleSquaresOpen: (arg0: boolean) => void;
};

function AreaSelection({ handleSquaresOpen }: AreaSelectionProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add('overflowHidden');
    return () => {
      document.body.classList.remove('overflowHidden');
    };
  }, []);

  const renderAreas = (amount: number) => {
    return [...Array(amount)].map((_, index) => {
      return (
        <div
          key={index}
          onClick={(e) => {
            const target = e.target as HTMLDivElement;
            dispatch(
              userActions.setUserAreaXY(target.getBoundingClientRect().toJSON())
            );
            handleSquaresOpen(false);
          }}
        ></div>
      );
    });
  };

  return createPortal(
    <StyledSquaresWrapper className="squaresWrapper">
      {renderAreas(25)}
    </StyledSquaresWrapper>,

    document.querySelector('.modal-container') as HTMLElement
  );
}

export default AreaSelection;
