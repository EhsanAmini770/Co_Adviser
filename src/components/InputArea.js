import React, { useState, useRef, useEffect } from 'react';
import './InputArea.css';

function InputArea({ setSentences }) {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [inputValue]);

    const sendMessageToServer = async (message) => {
        try {
            const formData = new FormData();
            formData.append('message', message);

            const response = await fetch('http://localhost:8000/ehsan-api', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending message to the server:', error);
            alert("Something went wrong! " + error.message);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (trimmedInput) {
            const userMessage = {
                id: Date.now().toString(),
                text: trimmedInput,
                sender: 'human',
            };
            setSentences(sentences => [...sentences, userMessage]);
            setInputValue('');

            const botResponse = await sendMessageToServer(trimmedInput);
            if (botResponse) {
                setSentences(sentences => [
                    ...sentences,
                    { id: botResponse.id, text: botResponse.message, sender: 'bot' },
                ]);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <div className="input-with-button">
                <textarea
                    ref={textareaRef}
                    className="input-field"
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoComplete="off"
                    rows={1}
                    style={{ resize: 'none', overflow: 'hidden', minHeight: '25px' }}
                />
                <button type="submit" className="submit-button">Send</button>
            </div>
        </form>
    );
}

export default InputArea;
