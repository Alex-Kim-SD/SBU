// SBU/react-app/src/components/BotCardArray/BotCardArray.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BotCard from '../BotCard/BotCard';
import { fetchBots } from '../../store/botSlice';

function BotCardArray({ userId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBots());
    }, [dispatch]);

    const bots = useSelector(state =>
        Object.values(state.bots).filter(bot => bot.user_id === userId)
    );

    if (!bots.length) {
        return <div>No bots found</div>;
    }

    return (
        <div>
            {bots.map(bot => (
                <BotCard key={bot.id} bot={bot} />
            ))}
        </div>
    );
}

export default BotCardArray;
