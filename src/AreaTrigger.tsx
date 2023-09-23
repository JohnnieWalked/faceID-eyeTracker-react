import { useState } from 'react';

/* components --- */
import ModalDialog from './ModalDialog';
import AreaSelection from './AreaSelection';

/* styled-components --- */
import { StyledXYSelection, MainButton } from './StyledComponents';

function AreaTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSquaresOpen, setIsSquaresOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledXYSelection>
      <span>Choose screen area for additional security:</span>
      <MainButton
        onClick={() => {
          setIsModalOpen(true);
          setIsSquaresOpen(true);
        }}
      >
        Choose area
      </MainButton>

      <ModalDialog
        handleModalClose={handleModalClose}
        title={'Attention'}
        isOpen={isModalOpen}
      >
        <p>
          <i>Dear User</i>, <br /> You will be provided squares, which represent
          specific areas on your screen to increase security level of
          identification. <br /> After selecting square, You have to look at
          this concrete area for successful identification.
        </p>
      </ModalDialog>

      {isSquaresOpen && <AreaSelection handleSquaresOpen={setIsSquaresOpen} />}
    </StyledXYSelection>
  );
}

export default AreaTrigger;
