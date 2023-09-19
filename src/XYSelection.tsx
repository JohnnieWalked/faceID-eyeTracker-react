import { useState } from 'react';

/* components --- */
import ModalDialog from './ModalDialog';

/* styled-components --- */
import { StyledXYSelection, MainButton } from './StyledComponents';

function XYSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledXYSelection>
      <span>Choose screen area for additional security:</span>
      <MainButton onClick={() => setIsModalOpen(true)}>Choose area</MainButton>

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
    </StyledXYSelection>
  );
}

export default XYSelection;
