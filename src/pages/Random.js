import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from '@emotion/styled';

import { API_KEY, BASE_URL } from '../App';

import PageContainer from '../styles/PageContainer';
import TableContainer from '../styles/TableContainer';

import beerMeIcon from '../components/beer-me-icon.svg';

const Loading = styled.span`
  margin: 20px;
  font-size: 24px;
  font-family: 'Overlock', sans-serif;
  color: #FFF;
`;

const Button = styled.button`
  border: 4px solid silver;
  background-color: steelblue;
  display: flex;
  flex-direction column;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;

  img {
    height: 100px;
    width: auto;
  }

  &:hover img {
    height: 110px;
    width: auto;
  }

  &:active {
    background-color: skyblue;
  }

`;

const Form = styled.form`
  margin-top: 5em;
`;

function RandomBeer(props) {

  return (
    <div>
    {props.beer ? (
      <TableContainer>
          <h2>{props.beer.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>ABV: </td>
                {props.beer.abv ? (<td>{props.beer.abv}</td>) : (<td>Unavailable</td>)}
              </tr>
              <tr>
                <td>Style: </td>
                {props.beer.style ? (<td>{props.beer.style.name}</td>) : (<td>Unavailable</td>)}
              </tr>
              <tr>
                <td>Category: </td>
                {props.beer.style && props.beer.style.category ? (
                  <td>{props.beer.style.category.name}</td>
                ) : (
                  <td>Unavailable</td>
                )}
              </tr>
              {props.beer.description ? (
                <tr>
                  <td style={{verticalAlign: 'top'}}>Description: </td>
                  <td>{props.beer.description}</td>
                </tr>
              ) : (
                <></>
              )}
            </tbody>
          </table>
      </TableContainer>
      ) : (
      <div></div>
    )}
    </div>
  );
}

function Random() {
  const [ beer, setBeer ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ rFetch, setFetch ] = useState(false);

  useEffect(() => {
    if (rFetch) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchRandomBeer() {
        let responseBody = {};
        setLoading(true);
        console.log("New Beer!");
        try {
          const response = await fetch(`${BASE_URL}beer/random?key=${API_KEY}`,
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
            setBeer(responseBody.data || {});
          }
      }

        fetchRandomBeer();
        return () => {
          controller.abort();
          ignore = true;
          setFetch(false);
        };
    }
  }, [ rFetch ]);

  //console.log("Beers from state: ", beer);

  return (
    <PageContainer>
      <h1>Beer Me!</h1>
      <Form onSubmit={(event) => {
        event.preventDefault();
        setFetch(true);
      }}>
        <Button type="submit"><img src={beerMeIcon} alt="Button to retrive info about a random beer"/></Button>
      </Form>
      {loading && (
          <Loading>Loading...</Loading>
        )}
      {beer.name ? (<RandomBeer beer={beer}/>) : (<></>)}

    </PageContainer>
  );
}

export default Random;
