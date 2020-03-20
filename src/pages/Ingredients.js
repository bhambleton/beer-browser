import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import { API_KEY, BASE_URL } from '../App';

import PageContainer from '../styles/PageContainer';

function Ingredients() {
  return (
    <PageContainer>
      <h1>Ingredient Search</h1>
    </PageContainer>
);
}

export default Ingredients;
