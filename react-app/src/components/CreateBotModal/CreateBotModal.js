import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

function CreateBotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [settings, setSettings] = useState('');
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  console.log('\n','UserID',user,'\n')

  const createBot = async (event) => {
    event.preventDefault();

    // Send fetch request
    const response = await fetch('/api/bots/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        user_id: user.id,
        settings,
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
