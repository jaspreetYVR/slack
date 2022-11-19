import React from 'react'
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../features/chatRoom/chatRoomSlice';
import { useNavigate } from 'react-router-dom';

const SidebarChannel = ({ Icon, text, addChannelOption, id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addChannel = async () => {
        const channelTitle = prompt("Please provide a room name");

        if (channelTitle) {

            const roomCollection = collection(db, "rooms")
            await addDoc(roomCollection, {
                channelTitle: channelTitle,
                timestamp: serverTimestamp()
            })
        }
    }

    const selectChannel = () => {
        if (id) {
            dispatch(setRoomId({
                roomId: id
            }));
            navigate("/chat");
        }
    }

    return (
        <SidebarMenuOptions onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon ?
                (<>
                    <IconButton>
                        <Icon fontSize="small" />
                    </IconButton>
                    <p>{text}</p>
                </>) :
                (<><span>#</span> <p>{text}</p></>)
            }
        </SidebarMenuOptions>
    )
}

export default SidebarChannel;


const SidebarMenuOptions = styled.div`
    display: flex;
    align-items: center;
    color: #9B9A9D;
    cursor: pointer;

    .MuiSvgIcon-root {
        color: #9B9A9D;
    }

    span{
        color: #9B9A9D;
        font-size: 20px;
        padding: 5px 15px;
    }

    :hover {
        background-color: #26242B;
    }
`;