import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from 'react-router-dom';
import styled from '@emotion/styled';

import PageContainer from '../styles/PageContainer';

import Yeasts from '../components/ingredients/Yeast';

const IngredientsNavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

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
    color: steelblue;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
  }

  li a.active {
    border-bottom: 2px solid #FFF;
  }
`;

function Ingredients() {
  const { path } = useRouteMatch();

  return (
    <PageContainer>
      <h1>Ingredient Search</h1>
      <IngredientsNavContainer>
      <ul>
        <li>
          <NavLink to={`${path}/hops`}>Hops</NavLink>
        </li>
        <li>
          <NavLink to={`${path}/malts`}>Malts</NavLink>
        </li>
        <li>
          <NavLink to={`${path}/yeast`}>Yeast</NavLink>
        </li>
        <li>
          <NavLink to={`${path}/misc`}>Misc</NavLink>
        </li>
      </ul>
      </IngredientsNavContainer>
      <Switch>
        <Route exact path={`${path}`}>
        </Route>
        <Route path={`${path}/hops`}>
          <h1>Hops</h1>
        </Route>
        <Route path={`${path}/malts`}>
          <h1>Malts</h1>
        </Route>
        <Route path={`${path}/yeast`}>
          <Yeasts />
        </Route>
        <Route path={`${path}/misc`}>
          <h1>Misc</h1>
        </Route>
      </Switch>
    </PageContainer>
);
}

export default Ingredients;
