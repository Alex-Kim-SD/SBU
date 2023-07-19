import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useHistory } from 'react-router-dom';

function CreateBotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [settingDetails, setSettingDetails] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  const history = useHistory();

  const createConversationSetting = async (event) => {
    event.preventDefault();

    // Send fetch request
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        setting_details: settingDetails,
      }),
    });

    if (response.ok) {
      const conversationSetting = await response.json();
      history.push(`/settings/${conversationSetting.id}`);
      closeModal();
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <>
      <h2>Create Settings</h2>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={createConversationSetting}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Setting Details:
          <textarea value={settingDetails} onChange={e => setSettingDetails(e.target.value)} />
        </label>
        <button type="submit">Create Conversation Setting</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </>
  );
}

export default CreateBotModal;
