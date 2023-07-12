import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function CreateBotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [settings, setSettings] = useState('');
  const [errors, setErrors] = useState([]);

  const createBot = async (event) => {
    event.preventDefault();

    // update later to thunk?
    const response = await fetch('/bots', {
      method: 'POST',
      body: JSON.stringify({
        name,
        user_id: userId,
        settings: JSON.parse(settings),
      }),
    });

    if(response.ok) {
      closeModal();
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <>
      <h2>Create Bot</h2>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={createBot}>
        <label>
          Bot Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          User ID:
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
        </label>
        <label>
          Bot Settings (JSON):
          <textarea value={settings} onChange={e => setSettings(e.target.value)} />
        </label>
        <button type="submit">Create Bot</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </>
  );
}

export default CreateBotModal;
