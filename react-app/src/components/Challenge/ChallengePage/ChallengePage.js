import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import robot from "../../../assets/robot.png";

function ChallengePage() {
    const dispatch = useDispatch();

    return (
        <div className='ChallengePage'>
            <h1>Challenge Page</h1>
        </div>
    );
}

export default ChallengePage;
