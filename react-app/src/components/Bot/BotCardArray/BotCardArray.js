import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BotCard from '../BotCard/BotCard';
import { fetchBots, selectBot } from '../../../store/botSlice';
import './BotCardArray.css';

function BotCardArray({ userId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBots());
    }, [dispatch]);

    const bots = useSelector(state =>
        Object.values(state.bots.your_bots).filter(bot => bot.user_id === userId)
    );

    if (!bots.length) {
        return <div>No bots found</div>;
    }

    return (
        <div className='bot-card-list'>
            {bots.map(bot => (
                <BotCard key={bot.id} bot={bot} onSelect={() => dispatch(selectBot(bot.id))} />
            ))}
        </div>
    );
}

export default BotCardArray;
