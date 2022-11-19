import React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import CommentIcon from '@mui/icons-material/Comment';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GroupIcon from '@mui/icons-material/Group';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SidebarChannel from './SidebarChannel';
import "../css/sidebar.css"
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = () => {

    const [user] = useAuthState(auth);
    const roomCollection = collection(db, "rooms");
    const q = query(roomCollection, orderBy("timestamp", "desc"));

    const [channels, loading] = useCollection(q);

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarHeaderTitle>
                    <SidebarHeadeTitleWrapper>
                        <h3>Coding Ninja Camping</h3>
                    </SidebarHeadeTitleWrapper>
                    <CreateOutlinedIcon />
                </SidebarHeaderTitle>
                <SidebarHeaderOnlineStatus>
                    <h5><FiberManualRecordIcon />
                        {user?.displayName}
                    </h5>
                </SidebarHeaderOnlineStatus>
            </SidebarHeader>

            <SidebarMenu>
                <SidebarChannel Icon={CommentIcon} text="Threads" />
                <SidebarChannel Icon={InboxIcon} text="Mentions & reactions" />
                <SidebarChannel Icon={DraftsIcon} text="Saved items" />
                <SidebarChannel Icon={BookmarkBorderIcon} text="Channel Browser" />
                <SidebarChannel Icon={GroupIcon} text="People & user groups" />
                <SidebarChannel Icon={AppsIcon} text="Apps" />
                <SidebarChannel Icon={FileCopyIcon} text="File browser" />
                <SidebarChannel Icon={ExpandLessIcon} text="Show less" />
            </SidebarMenu>

            <SidebarChannels>
                <SidebarChannel Icon={ExpandMoreIcon} text="Channels" />
                <SidebarChannel Icon={AddIcon} text="Add Channel" addChannelOption />
                {loading && <span>Channels are loading...</span>}
                {channels?.docs.map(doc => (
                    <SidebarChannel key={doc.id} id={doc.id} text={doc.data().channelTitle} />
                ))}
            </SidebarChannels>
        </SidebarContainer>
    )
}

export default Sidebar


const SidebarContainer = styled.div`
    flex: 0.19;
    background-color: #19171D;
    border-right: var(--bottom-border);
`;

const SidebarHeader = styled.div`
    padding: 8px 12px;
    color: #D1D2D3;
    border-bottom: 0.01px solid #37353E;
`;

const SidebarHeaderTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .MuiSvgIcon-root {
        background-color: #D1D2D3;
        padding: 5px;
        border-radius: 50%;
        color: black;
    }
`;

const SidebarHeadeTitleWrapper = styled.div`
    >h3 {
    width: 180px;
    color: #D1D2D3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
`;

const SidebarHeaderOnlineStatus = styled.div`
    border: 1.5px solid #D1D2D3;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
    margin-top: 10px;

    > h5 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
    }

    > h5 > .MuiSvgIcon-root{
        color: green;
        font-size: 14px;
        margin-right: 2px;
        margin-top: 1px;
    }
`;
const SidebarMenu = styled.div`
    border-bottom: 0.01px solid #37353E;
    font-size: 15px;
    padding: 8px;
`;

const SidebarChannels = styled.div`
    font-size: 15px;
    padding: 8px;
`;

