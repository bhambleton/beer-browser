import React, { useState } from 'react';
import styled from '@emotion/styled';

import Navbar from './Navbar';
import beerIcon from './beer-browser-icon.svg';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 140px;
  background-color: steelblue;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px auto 0px auto;
  border-radius: 50%;
  background-color: darkslategray;
  border: 4px solid #FFF;
  width: 175px;
  height: 175px;

  img {
    height: 150px;
    width: auto;
    margin-left: 40px;
  }
`;

const NavButton = styled.button`
    display: none;

    @media (max-width: 1004px) {
      position: absolute;
      top: 45px;
      right: 15px;
      color: #FFF;
      font-size: 50px;
      border: none;
      background: transparent;
      text-align: center;
      cursor: pointer;
      display: flex;
      z-index: 100;
    }
`;

function Header() {
  const [ toggle, switchToggle ] = useState(0);


  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={beerIcon} alt="Beer Browser Logo" />
      </LogoContainer>
      {toggle ? (
          <NavButton onClick={() => switchToggle(toggle => !toggle)}>
            &#x1D5EB;
          </NavButton>
        ) : (
          <NavButton onClick={() => switchToggle(toggle => !toggle)}>
            &#x2630;
          </NavButton>
      )}
      <Navbar show={toggle} />
    </HeaderContainer>
  );
}

export default Header;
