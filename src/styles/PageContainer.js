import styled from '@emotion/styled';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  border-top: 8px groove #FFF;
  border-bottom: 8px groove #FFF;
  background-color: #ffe49f;

  h1:first-of-type {
    font-family: 'Overlock', sans-serif;
    margin: 8px 0px;
    color: steelblue;
    font-size: 34px;
  }

  @media (max-width: 1004px) {
    h1:first-of-type {
      align-self: flex-start;
      margin-left: 35px;
    }
  }

`;

export default PageContainer;
