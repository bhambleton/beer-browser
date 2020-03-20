import React from 'react';
import styled from '@emotion/styled/macro';
import { NavLink } from 'react-router-dom';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 20px;

  a, a:visited {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
    display: flex;
  }

  li {
    align-self: center;
    margin: 0px 1em;
  }

  li a {
    color: #FFF;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
  }

  li a.active {
    border-bottom: 2px solid #FFF;
  }

  @media (max-width: 1004px) {
    height: 60%;
    width: ${props => props.show ? 250 : 0}px;
    position: absolute;
    top: 10px;
    right: 0;
    background-color: darkslategray;
    margin: 5px;
    transition: width 0.4s ease;
    border-radius: 5px;

    ul {
      display: ${props => props.show ? 'flex' : 'none'};
      padding: 5px;
      font-size: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    li {
      list-style-type: none;
      margin: 5px;
      padding: 4px;
    }
  }

`;

function Navbar(props) {

  return (
    <NavBarContainer show={props.show}>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/beers">Beers</NavLink>
        </li>
        <li>
          <NavLink to="/styles">Styles</NavLink>
        </li>
        <li>
          <NavLink to="/ingredients">Ingredients</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/random">Beer me!</NavLink>
        </li>
      </ul>
    </NavBarContainer>
  );
}

export default Navbar;
