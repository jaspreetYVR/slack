import { Avatar } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

const Message = ({ message, timestamp, user, photoUrl }) => {
    return (
        <MessageContainer>
            {/* <img src={photoUrl} alt="profile picture" /> */}
            <Avatar src={photoUrl}>{user && user[0]}</Avatar>
            <MessageInfo>
                <h3>{user}<span>{new Date(timestamp?.toDate()).toUTCString()}</span></h3>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message;


const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px;
    padding-left: 20px;

    :hover{
        background-color: #222529;
    }
`;

const MessageInfo = styled.div`
    margin-left: 8px;

    h3,p{
        color: #D1D2D3;
    }

    >p{
        margin-top: 5px;
    }

    >h3>span{
        color: #B1B1B3;
        font-weight: 400;
        font-size: 12px;
        margin-left: 10px;
    }

`;