import React from 'react';
import { useModal } from '../../../context/Modal';
import ConvSettingsModal from './EditConvModal';

function EditConvButton({ settingId }) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<ConvSettingsModal settingId={settingId} />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button onClick={handleClick}>
      Open EditConvModal
    </button>
  );
}

export default EditConvButton;
