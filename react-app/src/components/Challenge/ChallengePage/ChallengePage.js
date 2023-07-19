import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBots, fetchOtherBots } from '../../../store/botSlice';
import { fetchSettings } from '../../../store/convSettingsSlice'
import { createConversation } from '../../../store/convSlice';


const ChallengePage = () => {
    const dispatch = useDispatch();

    // Component state
    const [botId1, setBotId1] = useState(null);
    const [botId2, setBotId2] = useState(null);
    const [convSettingsId, setConvSettingsId] = useState(null);
    const [maxMessages, setMaxMessages] = useState('');
    const [topic, setTopic] = useState('');

    // Redux store data
    const userBots = useSelector((state) => state.bots.your_bots);
    const otherBots = useSelector((state) => state.bots.other_bots);
    const convSettings = useSelector((state) => Object.values(state.convSettings));
    console.log('\n','Conv Settings',convSettings,'\n')

    useEffect(() => {
        dispatch(fetchBots());
        dispatch(fetchOtherBots());
        dispatch(fetchSettings());
    }, [dispatch]);

    const handleBot1Change = (event) => {
        setBotId1(parseInt(event.target.value));
    };

    const handleBot2Change = (event) => {
        setBotId2(parseInt(event.target.value));
    };

    const handleConvSettingsChange = (event) => {
        setConvSettingsId(parseInt(event.target.value));
    };

    const handleMaxMessagesChange = (event) => {
        setMaxMessages(event.target.value);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (botId1 && botId2 && convSettingsId && maxMessages && topic) {
          dispatch(
            createConversation({
              bot_id_1: botId1,
              bot_id_2: botId2,
              conv_settings_id: convSettingsId,
              max_messages: parseInt(maxMessages),
              topic,
            })
          );
        }
      };


    return (
        <div>
            <h1>Create Conversation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="bot1">Bot 1:</label>
                    <select id="bot1" value={botId1} onChange={handleBot1Change}>
                        <option value="">Select Bot 1</option>
                        {Object.values(userBots).map((bot) => (
                            <option key={bot.id} value={bot.id}>
                                {bot.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="bot2">Bot 2:</label>
                    <select id="bot2" value={botId2} onChange={handleBot2Change}>
                        <option value="">Select Bot 2</option>
                        {Object.values(otherBots).map((bot) => (
                            <option key={bot.id} value={bot.id}>
                                {bot.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="convSettings">Conversation Settings:</label>
                    <select id="convSettings" value={convSettingsId} onChange={handleConvSettingsChange}>
                        <option value="">Select Conversation Settings</option>
                        {convSettings.map((setting) => (
                            <option key={setting.id} value={setting.id}>
                                {setting.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="maxMessages">Max Messages:</label>
                    <input
                        type="number"
                        id="maxMessages"
                        value={maxMessages}
                        onChange={handleMaxMessagesChange}
                    />
                </div>
                <div>
                    <label htmlFor="topic">Topic:</label>
                    <input type="text" id="topic" value={topic} onChange={handleTopicChange} />
                </div>
                <button type="submit">Create Conversation</button>
            </form>
        </div>
    );
};

export default ChallengePage;
