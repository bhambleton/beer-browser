import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import PageContainer from '../styles/PageContainer';

import { API_KEY, BASE_URL } from '../App';

//rgba(70, 130, 180, 0.4)
const SearchForm = styled.form`
  margin-top 25px;
  display: flex;
  align-items: center;

  input {
    font-size: 16px;
    margin-right: 7px;
  }

  button {
    height: 28px;
    border: 1px solid steelblue;
    background-color: #FFF;
    color: steelblue;
  }

  input:focus {
    outline: 1px solid lightsteelblue;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-contents: space-around;
  align-items: center;
  color: steelblue;
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 25px;
  color: steelblue;

  ul {
    padding: 0;
  }

  li {
    font-size: 18px;
  }

  span {
    font-size: 24px;
  }
`;

function parseResults(results) {
  //console.log("== results:", results);
  let newResults = results.map((result) => {
      let nResult = {};
      nResult['id'] = result.id;
      nResult['name'] = result.name;
      if (result.style) {
        nResult['style'] = result.style.name || "Unavailable";
        nResult['category'] = result.style.category.name || "Unavailable";
      }
      nResult['description'] = result.description || "Unavailable";
      nResult['ibu'] = result.ibu || "Unavailable";
      nResult['abv'] = result.abv || "Unavailable";
      return nResult;
      });
  //console.log("== newResults",newResults);
  return newResults;
}

function Search({ query }) {
  const [ userInput, setInput ] = useState(query || "");
  const [ results, setResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const history = useHistory();
  let searches = 0;

  useEffect(() => {
    if (query) {
      let ignore = false;
      const controller = new AbortController();

      async function fetchSearchResults() {
        let responseBody = {};
        setLoading(true);

        try {
          const response = await fetch(`${BASE_URL}search?q=${query}&key=${API_KEY}`,
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
            setError(true);
            console.log(e);
          }
        }

          if (!ignore) {
            setError(false);
            setLoading(false);
            //console.log("setting results from parse", parseResults(responseBody.data));
            //console.log(responseBody.data);
            if (responseBody.data) {
              setResults(parseResults(responseBody.data));
              searches++;
            } else { setResults([]); }
          }
      }

      fetchSearchResults();
      return () => {
        controller.abort();
        ignore = true;
      };
    }
  }, [ query, searches ]);

  return (
    <PageContainer>
      <h1>Item Search</h1>
      <SearchForm onSubmit={(event) => {
        event.preventDefault();
        userInput && history.push(`?q=${userInput}`);
      }}>
        <input value={userInput} onChange={e => setInput(e.target.value)}/>
        <button type="submit">Search</button>
      </SearchForm>
      <SearchResults>
        {error && <ErrorContainer>Error Searching!</ErrorContainer>}
        {loading ? (<span>Loading...</span>) : (
          results.length > 0 ? (
            <ul>
              {results.map(result => (
                <li key={result.id}>
                  {result.name}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )
        )}
      </SearchResults>
    </PageContainer>
  );
}

export default Search;
