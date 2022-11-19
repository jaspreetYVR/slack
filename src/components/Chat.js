import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import "../css/chat.css";
import { selectRoomId } from '../features/chatRoom/chatRoomSlice';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import Message from "../components/Message";
import { useEffect } from 'react';

const Chat = () => {

    const messageBottomRef = useRef(null);
    const roomId = useSelector(selectRoomId);

    if (roomId !== null && roomId !== undefined) {
        sessionStorage.setItem("roomID", roomId);
    }


    const docRef = doc(collection(db, "rooms"), sessionStorage.getItem("roomID"));
    const [currentRoomDetails] = useDocument(docRef);

    const subCollectionRef = collection(docRef, "messages");
    const q = query(subCollectionRef, orderBy("timestamp", "asc"))
    const [messages, loading] = useCollection(q);

    const sessionStorageRoomId = sessionStorage.getItem("roomID");

    useEffect(() => {
        messageBottomRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [loading, sessionStorageRoomId]);


    return (
        <ChatContainer>
            <ChatHeader>
                <ChatHeaderTop>
                    <ChatHeaderLeft>
                        <h2>{currentRoomDetails?.data().channelTitle}</h2>
                        <StarBorderOutlinedIcon fontSize='small' />
                    </ChatHeaderLeft>

                    <ChatHeaderRight>
                        <InfoOutlinedIcon fontSize='small' />
                        <p>Details</p>
                    </ChatHeaderRight>
                </ChatHeaderTop>

                <ChatHeaderBottom>
                    <h3>+ Add a bookmark</h3>
                </ChatHeaderBottom>
            </ChatHeader>

            <ChatBody>
                <ChatMessages>
                    {messages?.docs.map(doc => {
                        const { message, timestamp, user, photoUrl } = doc.data();

                        return (<Message
                            key={doc.id}
                            id={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            photoUrl={photoUrl}
                        />)

                    })}
                </ChatMessages>
                <ChatBottom ref={messageBottomRef} />
                <ChatInput roomName={currentRoomDetails?.data().channelTitle} roomId={sessionStorage.getItem("roomID")} messageBottomRef={messageBottomRef} />
            </ChatBody>
        </ChatContainer>
    )
}

export default Chat;


const ChatContainer = styled.div`
    flex: 0.81;
    display: flex;
    flex-direction: column;
    background-color: #1B1D21;
`;

const ChatHeader = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1B1D21;
    color: #D1D2D3;
`;

const ChatHeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    border-bottom: 0.01px solid #37353E;

    .MuiSvgIcon-root{
        margin-left: 5px;
        margin-right: 5px;
    }
`;

const ChatHeaderBottom = styled.div`
    h3{
        padding: 10px 23px;
        color: #9B9A9D;
        font-weight: 400;
        font-size: 13px;
        border-bottom: 0.01px solid #37353E;
    }
`;

const ChatHeaderLeft = styled.div`
    display: flex;
    align-items: center;

    h2{
        /* padding: 10px 25px; */
        /* border-bottom: 0.01px solid #37353E; */
        font-weight: 600;
        font-size: 18px;
    }
`;

const ChatHeaderRight = styled.div`
    display: flex;
    align-items: center;
`;


const ChatBody = styled.div`
    position: relative;
    flex: 1;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow-y: scroll;
`;

const ChatMessages = styled.div`


`;


const ChatBottom = styled.div`
    padding-bottom: 200px;
`;