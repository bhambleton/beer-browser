import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import styled from '@emotion/styled';

import { API_KEY, BASE_URL } from '../App';

import { getStyles, getStylesCount } from '../redux/selectors';
import { receiveStyles } from '../redux/actions';

import PageContainer from '../styles/PageContainer';
import ListContainer from '../styles/ListContainer';
import TableContainer from '../styles/TableContainer';

function parseStyles(styles) {
  console.log("== styles:", styles);
  let newStyles = styles.map((style) => {
      let nStyle = {};
      nStyle['id'] = style.id;
      nStyle['name'] = style.name;
      nStyle['category'] = style.category.name;
      nStyle['description'] = style.description;
      nStyle['ibuMin'] = style.ibuMin;
      nStyle['ibuMax'] = style.ibuMax;
      nStyle['abvMin'] = style.abvMin;
      nStyle['abvMax'] = style.abvMax;
      return nStyle;
      });
  console.log(newStyles);
  return newStyles;
}

const StylePageContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  align-items: center;

  h1 {
    align-self: center;
  }
`;

function StyleList(props) {
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

function Style() {
  const { item } = useParams();
  const style = useSelector(getStyles)[item];

  return (
    <TableContainer>
      <h2>{style.name}</h2>
      <table>
        <tbody>
          <tr>
            <td>Category: </td>
            <td>{style.category}</td>
          </tr>
          <tr>
            <td>IBU Min: </td>
            {style.ibuMin ? (<td>{style.ibuMin}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>IBU Max: </td>
            {style.ibuMax ? (<td>{style.ibuMax}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>ABV Min: </td>
            {style.abvMin ? (<td>{style.abvMin}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td>ABV Max: </td>
            {style.abvMax ? (<td>{style.abvMax}</td>) : (<td>Unavailable</td>)}
          </tr>
          <tr>
            <td style={{verticalAlign: 'top'}}>Description: </td>
            <td>{style.description}</td>
          </tr>
        </tbody>
      </table>
    </TableContainer>
  );
}

function Styles() {
  const [ styles, setStyles ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const stylesCount = useSelector(getStylesCount);
  const styleList = useSelector(getStyles);

  useEffect(() => {
    if (stylesCount === 0) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchStyles() {
        let responseBody = {};
        setLoading(true);

        try {
          const response = await fetch(`${BASE_URL}styles?key=${API_KEY}`,
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
            setStyles(parseStyles(responseBody.data));
          }
      }

      fetchStyles();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ stylesCount ]);

  if (styles.length > 0 && stylesCount === 0) {
      dispatch(receiveStyles(styles));
  }

  //console.log("Styles from state: ", useSelector(getStyles));

  return (
    <PageContainer>
      <h1>Styles</h1>
      <StylePageContainer>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <StyleList array={styleList}/>
        )}
        <Switch>
          <Route exact path={`${path}`}>
          </Route>
          <Route path={`${path}/:item`}>
            {stylesCount > 0 ? (<Style />) : (<Redirect to='/styles'/>)}
          </Route>
        </Switch>
      </StylePageContainer>
    </PageContainer>
  );
}

export default Styles;
