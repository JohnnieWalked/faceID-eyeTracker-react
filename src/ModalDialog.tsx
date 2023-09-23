import { useRef, useEffect } from 'react';

/* styled-components --- */
import {
  StyledModal,
  MainButton,
  StyledTitleNotification,
} from './StyledComponents';

type Props = {
  title: string;
  isOpen: boolean;
  handleModalClose: () => void;
  children: React.ReactNode;
};

function ModalDialog({ title, isOpen, handleModalClose, children }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <StyledModal ref={modalRef}>
      <StyledTitleNotification>{title}</StyledTitleNotification>
      {children}
      <MainButton onClick={handleModalClose}>I understand</MainButton>
    </StyledModal>
  );
}

export default ModalDialog;
