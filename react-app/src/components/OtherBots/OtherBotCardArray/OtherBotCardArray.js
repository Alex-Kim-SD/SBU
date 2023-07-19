import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OtherBotCard from '../OtherBotCard/OtherBotCard';
import { fetchOtherBots } from '../../../store/botSlice';

function OtherBotCardArray({ userId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOtherBots());
    }, [dispatch]);

    const bots = useSelector(state =>
        Object.values(state.bots.other_bots).filter(bot => bot.user_id !== userId)
    );

    if (!bots.length) {
        return <div>No bots found</div>;
    }

    return (
        <div className='card-list'>
            {bots.map(bot => (
                <OtherBotCard key={bot.id} bot={bot} />
            ))}
        </div>
    );
}

export default OtherBotCardArray;
