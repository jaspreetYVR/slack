import React from 'react'
import styled from 'styled-components';

const LandingPage = () => {
    return (
        <LandingPageContainer>
            <p>Please choose a channel from left pane.</p>
        </LandingPageContainer>
    )
}

export default LandingPage;


const LandingPageContainer = styled.div`
    color: black;
    flex: 0.81;
    display: grid;
    place-items: center;
    background-color:#FAF9F6 ;
`;