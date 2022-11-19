import { Button } from '@mui/material';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';

const ChatInput = ({ roomName, roomId, messageBottomRef }) => {

    const [message, setMessage] = useState('');
    const [user] = useAuthState(auth);

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (!roomId) {
            return false;
        }

        const docRef = doc(collection(db, "rooms"), roomId);
        const subCollectionRef = collection(docRef, "messages");
        await addDoc(subCollectionRef, {
            message: message,
            timestamp: serverTimestamp(),
            user: user?.displayName,
            photoUrl: user?.photoURL
        })

        messageBottomRef?.current?.scrollIntoView({
            behavior: "smooth"
        })

        setMessage("");
    }

    return (
        <ChatInputContainer>
            <form>
                <input type="text" value={message} onChange={handleChange} placeholder={`Message ${roomName}`} />
                <Button hidden type='submit' onClick={handleClick}>Send</Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer = styled.div`
    
    display: flex;
    justify-content: center;
    
    >form{
        position: fixed;
        bottom: 30px;
        width: 70%;
        background-color: #000000e8;
        padding: 20px 10px;
        border-radius: 10px;
        border-bottom: 0.01px solid #37353E;
        display: flex;
        border: var(--bottom-border);
    }
    
    >form >input{
       flex: 1;
       padding: 10px;
       outline: 0;
       background-color: transparent;
       border: none;
       color: #D1D2D3;
    }

    >form >button{
        display: none !important;
    }
`;