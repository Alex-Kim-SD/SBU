import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchBots, fetchOtherBots } from '../../../store/botSlice';
import { fetchSettings } from '../../../store/convSettingsSlice';
import { createConversation } from '../../../store/convSlice';
import './ChallengePage.css';
import LoadingSpinner from "../../../context/LoadingSpinner";

const ChallengePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Component state
  const [botId1, setBotId1] = useState(null);
  const [botId2, setBotId2] = useState(null);
  const [convSettingsId, setConvSettingsId] = useState(null);
  const [maxMessages, setMaxMessages] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [debate, setDebate] = useState(null);
  const [errors, setErrors] = useState([]); // error state


  // Redux store data
  const userBots = useSelector((state) => state.bots.your_bots);
  const otherBots = useSelector((state) => state.bots.other_bots);
  const convSettings = useSelector((state) => Object.values(state.convSettings));
  const currentUserId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(fetchBots());
    dispatch(fetchOtherBots());
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (debate) {
      history.push(`/debates/${debate}`);
    }
  }, [debate, history]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]); // Reset the error messages before validating
    let validationErrors = [];

    if (!botId1 || !botId2 || !convSettingsId || !maxMessages || !topic) {
      validationErrors.push('All fields are required.');
    }

    if (parseInt(maxMessages) > 16) {
      validationErrors.push('Max messages should not be more than 16.');
    }

    if (topic.length > 40) {
      validationErrors.push('Topic length should not be more than 40 characters.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return; // If there are validation errors, stop the form from submitting.
    }

    setLoading(true);
    console.log(currentUserId);
    const newConversation = await dispatch(
      createConversation({
        bot_id_1: botId1,
        bot_id_2: botId2,
        conv_settings_id: convSettingsId,
        max_messages: parseInt(maxMessages),
        topic,
        owner_id: parseInt(currentUserId),
      })
    );
    setLoading(false);

    if (newConversation.payload && newConversation.payload.debate.id) {
      setDebate(newConversation.payload.debate.id);
    }
  };

  return (
    <div className="challenge-page">
      {loading && <LoadingSpinner />}
      <h1 className="page-heading">Create Conversation</h1>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="convSettings">Conversation Settings:</label>
          <select
            id="convSettings"
            value={convSettingsId}
            onChange={handleConvSettingsChange}
          >
            <option value="">Select Conversation Settings</option>
            {convSettings.map((setting) => (
              <option key={setting.id} value={setting.id}>
                {setting.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="maxMessages">Max Messages:</label>
          <input
            type="number"
            id="maxMessages"
            value={maxMessages}
            onChange={handleMaxMessagesChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input type="text" id="topic" value={topic} onChange={handleTopicChange} />
        </div>
        <button type="submit" className="submit-button">
          Create Conversation
        </button>
      </form>
    </div>
  );
};

export default ChallengePage;
