import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';

const Login = () => {

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);

        } catch (error) {
            console.log("error in logging in : " + error);
        }
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg' alt='slack logo' />
                <Button variant='contained' onClick={handleLogin}>Login in with Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login;


const LoginContainer = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: #FAF9F6;
`;

const LoginInnerContainer = styled.div`

    display: flex;
    flex-direction: column;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 10px;
    padding: 20px;
    align-items: center;
    background-color: #fff;

    >img{
        height: 200px;
        object-fit: contain;
    }

    .MuiButton-root{
        margin-top: 20px;
        width: 215px;
    }
`;