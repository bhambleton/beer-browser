import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// PAGES
import Beers from './pages/Beers';
import Styles from './pages/Styles';
import Random from './pages/Random';
import Search from './pages/Search';
import Ingredients from './pages/Ingredients';
import Home from './pages/Home';

// COMPONENTS
import Header from './components/Header';

export const API_KEY = '8402f8e76fa6df98996cf0f743d5cd9e';
export const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/';

const FooterContainer = styled.div`
  position: relative;
  margin-top: 25px;
  bottom: 0;

  span {
    font-family: 'Raleway', sans-serif;
    font-size: 10px;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <span>Icons made by various artists from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></span>
    </FooterContainer>
  );
}

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/beers">
          <Beers />
        </Route>
        <Route path="/styles">
          <Styles />
        </Route>
        <Route path="/ingredients">
          <Ingredients />
        </Route>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route path="/random">
          <Random />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
