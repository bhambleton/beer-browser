import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import fetch from 'isomorphic-unfetch';
import styled from '@emotion/styled';

import { API_KEY, BASE_URL } from '../../App';

import { getYeast, getYeastCount } from '../../redux/selectors';
import { receiveYeast } from '../../redux/actions';

import TableContainer from '../../styles/TableContainer';
import ListContainer from '../../styles/ListContainer';
import IngredientPageContainer from '../IngredientPageContainer';


const YeastPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;

  h1 {
    align-self: center;
  }
`;

function parseYeast(yeasts) {
  console.log("== yeasts:", yeasts);
  let newYeasts = yeasts.map((yeast) => {
      let nYeast = {};
      nYeast['id'] = yeast.id;
      nYeast['name'] = yeast.name;
      if (yeast.description) {
        nYeast['description'] = yeast.description;
      }
      if (yeast.yeastType) {
        nYeast['type'] = yeast.yeastType;
      }
      if (yeast.attenuationMin) {
        nYeast['attenuationMin'] = yeast.attenuationMin;
      }
      if (yeast.attenuationMax) {
        nYeast['attenuationMax'] = yeast.attenuationMax;
      }
      if (yeast.fermentTempMin) {
        nYeast['fTempMin'] = yeast.fermentTempMin;
      }
      if (yeast.fermentTempMax) {
        nYeast['fTempMax'] = yeast.fermentTempMax;
      }
      if (yeast.fermentTempMin) {
        nYeast['alcoholToleranceMin'] = yeast.alcoholToleranceMin;
      }
      if (yeast.fermentTempMax) {
        nYeast['alcoholToleranceMax'] = yeast.alcoholToleranceMax;
      }
      return nYeast;
      });
  console.log(newYeasts);
  return newYeasts;
}

function YeastList(props) {
  const { url } = useRouteMatch();

  return (
    <ListContainer>
      <ul>
        {Object.entries(props.array).map(
          ([key, object]) => (
            <li key={object.id}>
              <NavLink to={`${url}/${key}`}>
                {object.name}
              </NavLink>
            </li>
          )
        )}
      </ul>
    </ListContainer>
  );
}

function Yeast() {
  const { item } = useParams();
  const yeast = useSelector(getYeast)[item];

  return (
    <TableContainer>
      <h2>{yeast.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>Type: </td>
            <td>{yeast.type}</td>
          </tr>
          <tr>
            <td>Attenuation Min: </td>
            {yeast.attenuationMin ? (<td>{yeast.attenuationMin}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Attenuation Max: </td>
            {yeast.attenuationMax ? (<td>{yeast.attenuationMax}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Fermentation Temperature Min: </td>
            {yeast.fTempMin ? (<td>{yeast.fTempMin}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Fermentation Temperature Max: </td>
            {yeast.fTempMax ? (<td>{yeast.fTempMax}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Alcohol Tolerance Min: </td>
            {yeast.alcoholToleranceMin ? (<td>{yeast.alcoholToleranceMin}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>Alcohol Tolerance Max: </td>
            {yeast.alcoholToleranceMax ? (<td>{yeast.alcoholToleranceMax}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td style={{verticalAlign: 'top'}}>Description: </td>
            <td>{yeast.description}</td>
          </tr>
        </tbody>
      </table>
    </TableContainer>
  );
}

function Yeasts() {
  const [ yeast, setYeast ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const yeastList = useSelector(getYeast);
  const yeastCount = useSelector(getYeastCount);
  const { path } = useRouteMatch();

  useEffect(() => {
    if (yeastCount === 0) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchYeast() {
        let responseBody = {};
        setLoading(true);

        try {
          const response = await fetch(`${BASE_URL}yeasts?key=${API_KEY}`,
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
            setYeast(parseYeast(responseBody.data));
          }
      }

      fetchYeast();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ yeastCount ]);

  if (yeast.length > 0 && yeastCount === 0) {
      dispatch(receiveYeast(yeast));
  }

  console.log("Yeast from state: ", useSelector(getYeast));


  return (
    <IngredientPageContainer>
      <h1>Yeast</h1>
      <YeastPageContainer>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <YeastList array={yeastList}/>
        )}
        <Switch>
          <Route exact path={`${path}`}>
          </Route>
          <Route path={`${path}/:item`}>
            {yeastCount > 0 ? (<Yeast />) : (<Redirect to='/yeast'/>)}
          </Route>
        </Switch>
      </YeastPageContainer>
    </IngredientPageContainer>
  );
}

export default Yeasts;
