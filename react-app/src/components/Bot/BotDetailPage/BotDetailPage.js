import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBot, fetchBot, fetchBots } from '../../../store/botSlice';
import robot from "../../../assets/robot.png";
import { useModal } from '../../../context/Modal';
import EditBotModal from '../EditBotModal/EditBotModal';
import './BotDetailPage.css';


function truncate(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

function BotDetailPage({ botId }) {
  const dispatch = useDispatch();
  const { setModalContent, setOnModalClose } = useModal();
  useEffect(() => {
    if (botId) {
      dispatch(fetchBot(botId));
    }
  }, [botId, dispatch]);

  const bot = useSelector(state => state.bots.your_bots[botId]);
  const history = useHistory();

  if (!botId || !bot) {
    return <div>Select a bot to view details</div>;
  }
  const handleEditClick = () => {
    setModalContent(<EditBotModal botId={botId} />);
    setOnModalClose(() => {
      console.log("Modal has been closed.");
    });
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bot?")) {
      await dispatch(deleteBot(botId));
      await dispatch(fetchBots());
      history.push('/bots');
    }
  };

  return (
    <div className='selected-bot-detail-container'>
      <div className='selected-bot-detail-image-container'>
        <img src={robot} alt="selected-Bot avatar" className='selected-bot-img' />
      </div>
      <div className='selected-bot-info'>
        <div className='selected-bot-name-settings-container'>
        <h2 className='selected-bot-name'>{bot.name}</h2>
        <p className='selected-bot-settings'>{truncate(bot.settings, 50)}</p>
        </div>
        <div className='selected-bot-button-container'>
          <button className='edit-selected-bot-button' onClick={handleEditClick}>Edit</button>
          <button className='delete-selected-bot-button' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BotDetailPage;
