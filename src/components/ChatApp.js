import React, { useState } from 'react';
import InputArea from './InputArea'; // Ensure this path is correct
import DisplayArea from './DisplayArea'; // Ensure this path is correct
import './ChatApp.css'; // If you have additional styling for the chat container

function ChatApp() {
    const [sentences, setSentences] = useState([]);

    return (
        <div className="chat-container">
            <DisplayArea sentences={sentences} />
            <InputArea setSentences={setSentences} />
        </div>
    );
}

export default ChatApp;
