// Module Imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import styled from '@emotion/styled';

// Local Imports
import { getBeers, getBeerCount } from '../redux/selectors';
import { receiveBeers } from '../redux/actions';
import { API_KEY, BASE_URL } from '../App';

import PageContainer from '../styles/PageContainer';
import ListContainer from '../styles/ListContainer';
import TableContainer from '../styles/TableContainer';

import beerData from '../data/beers.json';

function parseIngredients(ingredients) {
  console.log("== ingredients:", ingredients);
  let newIngredients = ingredients.map((ingredient) => {
      let nIngredient = {};
      nIngredient['id'] = ingredient.id;
      nIngredient['name'] = ingredient.name;
      nIngredient['category'] = ingredient.categoryDisplay;
      return nIngredient;
      });
  console.log(newIngredients);
  return newIngredients;
}

function BeerList(props) {
  const { url } = useRouteMatch();

  return (
    <ListContainer>
      <ul>
        {Object.entries(props.array).map(
          ([key, object]) => (
            <li key={object.id}>
              <NavLink to={`${url}/${key}`}>
                {object.nameDisplay}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </ListContainer>
  );
}


function Beer() {
  const { item } = useParams();
  const beer = useSelector(getBeers)[item];
  const [ ingredients, setIngredients ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ currentItem, setCurrentItem ] = useState({});

  //console.log("Beer ID: ", beer.id);
  //console.log("Beer from Beer: ", beer);
  useEffect(() => {
    if (item !== currentItem) {
      setCurrentItem(beer);
      setIngredients([]);
      let ignore = false;
      const controller = new AbortController();

      async function fetchIngredients() {
        let responseBody = {};
        setLoading(true);

        try {
          const response = await fetch(`${BASE_URL}beer/${currentItem.id}/ingredients?key=${API_KEY}`,
            {
              signal: controller.signal,
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          responseBody = await response.json();
        } catch (e) {
          if (e instanceof DOMException) {
            console.log("== HTTP req aborted");
          } else {
            console.log(e);
          }
        }

          if (!ignore) {
            setLoading(false);
            if (responseBody.data) {
              setIngredients(parseIngredients(responseBody.data));
            }
          }
      }

      fetchIngredients();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ item, currentItem, beer ]);

  console.log("ingredients: ", ingredients)

  return(
    <TableContainer>
      <h2>{beer.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>ABV: </td>
            {beer.abv ? (<td>{beer.abv}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Style: </td>
            {beer.style ? (
                <td>{beer.style.name}</td>
              ) : (
                <td>Unavailable</td>
            )}
          </tr>
          <tr>
            <td>Category: </td>
            {beer.style && beer.style.category ? (<td>{beer.style.category.name}</td>) : (<td>Unavailable</td>)}
          </tr>
          {beer.glass ? (
            <tr>
              <td>Glass: </td>
              <td>{beer.glass.name}</td>
            </tr>
          ) : (
            <></>
          )}
          {beer.description ? (
            <tr>
              <td style={{verticalAlign: 'top'}}>Description: </td>
              <td>{beer.description}</td>
            </tr>
          ) : (
            <></>
          )}
          {beer.foodPairings ? (
            <tr>
              <td style={{verticalAlign: 'top'}}>Suggested Pairings: </td>
              <td>{beer.foodPairings}</td>
            </tr>
          ) : (
            <></>
          )}
          {beer.labels ? (
            <>
            <tr>
              <td style={{verticalAlign: 'top'}}>Label: </td>
            </tr>
            <tr>
            <td></td>
              <td><img src={beer.labels.large} alt={`${beer.name} label`}/></td>
            </tr>
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {loading && ingredients ? (
          <span>Loading...</span>
        ) : (
        ingredients.length > 0 ?
          (<table>
            <tbody>
            <tr>
              <td>Ingredients: </td>
            </tr>
            <></>
            {ingredients.map(ingredient => (
              <tr key={ingredient.id}>
                <td></td>
                <td>{ingredient.name}, {ingredient.category}</td>
              </tr>
            ))}
            </tbody>
          </table>) : (<></>)
      )}
    </TableContainer>
  );

}

const BeerPageContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 10px;
`;

function Beers() {
  const dispatch = useDispatch();
  const beerCount = useSelector(getBeerCount);
  const beers = useSelector(getBeers);
  const { path } = useRouteMatch();

  if (beerCount === 0){
    console.log("== Getting beers!")
    dispatch(receiveBeers(beerData.data));
  }

  //console.log("Beers from state: ", useSelector(getBeers));

  return (
    <PageContainer>
      <h1>Beers</h1>
      <BeerPageContainer>
        <BeerList array={beers}/>
        <Switch>
          <Route exact path={`${path}`}>
          </Route>
          <Route path={`${path}/:item`}>
            <Beer />
          </Route>
        </Switch>
      </BeerPageContainer>
    </PageContainer>
  );
}

export default Beers;
