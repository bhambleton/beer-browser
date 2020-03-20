import styled from '@emotion/styled';

const ListContainer = styled.div`
  display: flex;
  align-content: space-around;
  flex-direction: column;
  height: 550px;
  overflow-y: scroll;
  background-color: #FFF;
  width: 350px;
  margin: 0px 15px;
  border-radius: 4px;

  ul {
    list-style-type: none;
    font-size: 16px;
    padding: 0px 15px;
  }

  li {
    margin: 0.75em 0em;
    font-family: 'Overlock', sans-serif;
    padding: 5px;
  }

  li a {
    color: steelblue;
    text-decoration: none;
  }

  a.active {
    border-bottom: 2px solid steelblue;
  }

  li:hover {
    background-color: #fbd063;
  }

  li:hover a {
    color: #FFF;
  }

`;

export default ListContainer;
