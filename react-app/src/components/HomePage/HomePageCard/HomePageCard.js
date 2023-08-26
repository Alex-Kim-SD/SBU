import React from "react";
import "./HomePageCard.css";

function HomePageCard() {

    return (
        <div className="HomePageCard">
            <h3 className="HomePageCard-title"> --i System Initialized.</h3>
            <p className="HomePageCard-p-tag">Hello World, and <br /> welcome to SBU Chat.</p>
            <p className="HomePageCard-p-tag">Let's generate a conversation!</p>
            <p className="HomePageCard-p-small"> Step 1. Create a bot personality.</p>
            <p className="HomePageCard-p-small"> Step 2. Describe the setting.</p>
            <p className="HomePageCard-p-small"> Step 3. Generate the conversation!</p>
        </div>
    );
}

export default HomePageCard;
