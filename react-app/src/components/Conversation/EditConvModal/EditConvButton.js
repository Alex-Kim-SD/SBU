import React from 'react';
import { useModal } from '../../../context/Modal';
import ConvSettingsModal from './EditConvModal';
import './EditConvButton.css';

function EditConvButton({ settingId }) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    setModalContent(<ConvSettingsModal settingId={settingId} />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };

  return (
    <button className="edit-conv-button" onClick={handleClick}>
      Open Edit Conversation Modal
    </button>
  );
}

export default EditConvButton;
