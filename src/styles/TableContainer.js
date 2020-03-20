import styled from '@emotion/styled';

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  color: steelblue;

  h2 {
    font-family: 'Overlock';
  }

  td:first-child {
    text-align: right;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
  }

  tr {
    margin: 5px 0px;
  }

  tr td + td {
    text-align: justify;
    padding: 0 3em;
    font-family: 'Raleway', sans-serif;
    max-width: 600px;
    margin-right: 15px;
  }

  img {
    height: 175px;
    width: auto;
  }
`;

export default TableContainer;
