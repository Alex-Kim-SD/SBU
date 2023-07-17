import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal"
import { fetchBot, editBot } from '../../../store/botSlice';

function EditBotModal({ botId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [settings, setSettings] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchBot(botId));
    }, [botId, dispatch]);

    const bot = useSelector(state => state.bots[botId]);
    useEffect(() => {
        if (bot) {
            setName(bot.name);
            setSettings(bot.settings);
        }
    }, [bot]);

    const updateBot = async (event) => {
        event.preventDefault();

        const updatedBot = {
            name,
            user_id: user.id,
            settings,
        };

        dispatch(editBot(botId, updatedBot))
            .then((res) => {
                closeModal();
            })
            .catch((err) => {
                setErrors(err);
            });
    };

    return (
        <>
            <h2>Edit Bot</h2>
            {errors.map((error, i) => (
                <div key={i}>{error}</div>
            ))}
            <form onSubmit={updateBot}>
                <label>
                    Bot Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Bot Settings (JSON):
                    <textarea value={settings} onChange={e => setSettings(e.target.value)} />
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </>
    );
}

export default EditBotModal;
