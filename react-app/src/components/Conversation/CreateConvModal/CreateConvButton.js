import React from 'react';
import { useModal } from '../../../context/Modal';
import CreateConvModal from './CreateConvModal';

function CreateConvButton() {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<CreateConvModal />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button onClick={handleClick}>
      Open CreateConvModal
    </button>
  );
}

export default CreateConvButton;
