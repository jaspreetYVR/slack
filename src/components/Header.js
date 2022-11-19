import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import "../css/header.css"
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {

    const [user] = useAuthState(auth);

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log("error while logging out : " + error);
        }
    }

    return (
        <HeaderContainer>
            <HeaderLeft>
                <IconButton>
                    <AccessTimeIcon fontSize='small' />
                </IconButton>
            </HeaderLeft>
            <HeaderRight>
                <HeaderSearch>
                    <IconButton>
                        <SearchIcon fontSize='small' />
                    </IconButton>
                    <input type="text" placeholder='Search' />
                    <IconButton>
                        <TuneIcon fontSize='small' />
                    </IconButton>
                </HeaderSearch>
                <HeaderAvatarContainer>
                    <IconButton>
                        <HelpOutlineIcon fontSize='small' />
                    </IconButton>
                    <HeaderAvatar src={user?.photoURL} onClick={handleLogout} sx={{ height: '30px', width: '30px' }}>{user && user.displayName[0]}</HeaderAvatar>
                </HeaderAvatarContainer>
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;


const HeaderContainer = styled.div`
    display: flex;
    background-color: var(--slack-header-color);
    padding: 8px 15px;
    border-bottom: var(--bottom-border);

    .MuiSvgIcon-root {
        color: #D1D2D3;
    }

    .MuiButtonBase-root {
    padding: 5px !important;
}
`;


const HeaderLeft = styled.div`
    flex: 0.18;
    text-align: end;

    .MuiSvgIcon-root {
    margin-right: 12px;
}
`;

const HeaderRight = styled.div`
    flex: 0.82;
    display: flex;
    justify-content: space-between;
`;

const HeaderSearch = styled.div`
    background-color: #3E3D42;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 0.1px solid gray;

    > input {
        width: 45vw;
        padding: 5px;
        outline-width: 0;
        background-color: transparent;
        border: none;
        color: #D1D2D3;
    }
`;

const HeaderAvatarContainer = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.7;
    }
`;