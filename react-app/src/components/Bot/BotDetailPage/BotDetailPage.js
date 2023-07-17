  import React, { useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { useHistory, useParams } from 'react-router-dom';
  import { deleteBot, fetchBot, fetchBots } from '../../../store/botSlice';
  import robot from "../../../assets/robot.png";
  import EditBotButton from "../EditBotModal/EditBotButton"

  function BotDetailPage() {
    const { botId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchBot(botId));
    }, [botId, dispatch]);

    // const state = useSelector(state => state);
    // console.log('\n','State',state);

    const bot = useSelector(state => state.bots[botId]);
    const history = useHistory();

    if (!bot) {
      return <div>Bot not found</div>;
    }

    const handleDelete = async () => {
      if(window.confirm("Are you sure you want to delete this bot?")) { //replace with modal later maybe
        await dispatch(deleteBot(botId));
        await dispatch(fetchBots())
        history.push('/bots');
      }
    };

    return (
      <div>
        <img src={robot} alt="Bot avatar" />
        <h2>{bot.name}</h2>
        <p>{bot.settings}</p>
        <button onClick={handleDelete}>Delete Bot</button>
        <EditBotButton botId={botId}/>
      </div>
    );
  }

  export default BotDetailPage;
