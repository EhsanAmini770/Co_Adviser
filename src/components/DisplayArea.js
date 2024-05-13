import React, { useEffect, useRef, useState } from 'react';
import './DisplayArea.css';

const INITIAL_BOT_MESSAGE = {
    id: 'initial-bot-msg',
    sender: 'bot',
    text: "Hello! I'm Co Adviser, your virtual assistant for navigating university life...",
    typing: false, // Change this to false if the bot is not typing initially
    displayText: "Hello! I'm Co Adviser, your virtual assistant for navigating university life...",
};

function DisplayArea({ sentences }) {
    const [displayedSentences, setDisplayedSentences] = useState([INITIAL_BOT_MESSAGE]);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const [initialMessageEffect, setInitialMessageEffect] = useState(true); // New state for initial message effect

    useEffect(() => {
        // Combine initial message with new sentences
        setDisplayedSentences([INITIAL_BOT_MESSAGE, ...sentences]);
    }, [sentences]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayedSentences]);

    useEffect(() => {
        if (initialMessageEffect) {
            // Animation effect for the initial message
            typingTimeoutRef.current = setTimeout(() => {
                setDisplayedSentences(currentDisplayed => {
                    const updatedSentences = currentDisplayed.map(s => {
                        if (s.id === 'initial-bot-msg') {
                            return { ...s, displayText: '' };
                        }
                        return s;
                    });
                    return updatedSentences;
                });
                setInitialMessageEffect(false); // Disable animation after the initial effect
            }, 500);
        }
    }, [initialMessageEffect]);

    useEffect(() => {
        const lastBotMessageIndex = displayedSentences.map(s => s.sender).lastIndexOf('bot');
        if (lastBotMessageIndex !== -1) {
            const lastBotMessage = displayedSentences[lastBotMessageIndex];
            if (lastBotMessage.sender === 'bot' && lastBotMessage.typing && lastBotMessage.displayText === undefined) {
                typingTimeoutRef.current = setTimeout(() => {
                    setDisplayedSentences(currentDisplayed =>
                        currentDisplayed.map((s, i) =>
                            i === lastBotMessageIndex ? { ...s, displayText: '', typing: true } : s
                        )
                    );
                }, 500);
            }
        }
    }, [displayedSentences]);

    useEffect(() => {
        const lastMessageIndex = displayedSentences.length - 1;
        const lastMessage = displayedSentences[lastMessageIndex];
        if (lastMessage && lastMessage.sender === 'bot' && !lastMessage.typing && (lastMessage.displayText?.length ?? 0) < lastMessage.text.length) {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                setDisplayedSentences(currentDisplayed =>
                    currentDisplayed.map((s, index) => {
                        if (index === lastMessageIndex) {
                            const nextCharIndex = lastMessage.displayText?.length ?? 0;
                            return {
                                ...s,
                                displayText: lastMessage.text.substring(0, nextCharIndex + 1),
                            };
                        }
                        return s;
                    })
                );
            }, 12);
        }
    }, [displayedSentences]);

    function formatMessage(text) {
        // Regex pattern to match phrases ending with a colon
        const boldPattern = /([^:]+:)(.*?)(?=(\n|$))/g;
    
        // Split the text into lines
        const lines = text.split('\n');
    
        // Apply bold formatting to each line and prepend a dot at the beginning
        // Do not add <br> before the first line
        const formattedText = lines.map((line, index) => {
            const formattedLine = line.replace(boldPattern, (match, p1, p2) => `<strong>${p1}</strong>${p2}`);
            return (index > 0 ? '<br>' : '') + formattedLine;
        }).join('');
    
        // Combine the lines into a single HTML element
        return (
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
    }
    
    

    return (
        <div className="display-area">
            {displayedSentences.map(sentence => (
                <div key={sentence.id} className={`sentence ${sentence.sender}`}>
                    <i className={sentence.sender === 'bot' ? "fa-solid fa-wand-magic-sparkles" : "fas fa-user"}></i>
                    <span className="message-text">
                        {sentence.id === 'initial-bot-msg' && initialMessageEffect ? (
                            // Render the initial message with the effect
                            <span className="message-text">
                                {formatMessage(sentence.displayText)}
                            </span>
                        ) : (
                            // Render other messages without the effect
                            sentence.displayText !== undefined
                                ? formatMessage(sentence.displayText)
                                : formatMessage(sentence.text)
                        )}
                    </span>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default DisplayArea;
