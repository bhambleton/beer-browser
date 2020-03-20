import React from 'react';
import styled from '@emotion/styled';

import IngredientsIcon from '../components/ingredients-icon.svg';
import BeerIcon from '../components/beer-icon.svg';
import SearchIcon from '../components/search-icon.svg';

const HomePageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
min-height: 80vh;
border-top: 8px groove #FFF;
border-bottom: 8px groove #FFF;
background-color: #FFF;

h1:first-of-type {
  font-family: 'Overlock', sans-serif;
  margin: 4px 0px;
  color: steelblue;
  font-size: 64px;
}
`;

const PageTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6em;
`;

const HomeItemContainer = styled.div`
  margin: 4em auto 1em auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 180px;
  width: 180px;
  margin: 15px;

  img {
    height: 150px;
    width: auto;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    color: steelblue;
    margin: 4px auto;
  }

  span {
    height: 10px;
    background-color: #ffe49f;
    width: 0px;
    transition: width 0.4s ease;
    border-radius: 4px;
  }

  &:hover span {
    width: 80%;
  }

`;

function Home() {

  return(
    <HomePageContainer>
      <PageTitle>
        <h1>Beer Browser</h1>
        <span>Browse various types and styles of beer and their ingredients.</span>
      </PageTitle>
      <HomeItemContainer>
          <ImageContainer>
            <img src={BeerIcon} alt="A pint of beer" />
            <h2>Beers</h2>
            <span></span>
          </ImageContainer>
          <ImageContainer>
            <img src={IngredientsIcon} alt="Four ingredients commonly found in beer" />
            <h2>Ingredients</h2>
            <span></span>
          </ImageContainer>
          <ImageContainer>
            <img src={SearchIcon} alt="A magnifying glass" />
            <h2>Search</h2>
            <span></span>
          </ImageContainer>
      </HomeItemContainer>
    </HomePageContainer>
  );
}

export default Home;
