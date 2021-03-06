import React, {unstable_Profiler as Profiler} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fps-emit';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import SpecialContext from './SpecialContext'

import { addTweet } from './actions';

import * as c from './constants';

const highOrderSliceReducer = (sliceId = '') => (state = [], action) => {
  switch (action.type) {
    case `${c.ADD_TWEET}_${sliceId}`: {
      return [...state, action.tweet];
    }
    default: {
      return state
    }
  }
}

const reducers = Array(c.NUMBER_OF_SLICES).fill(0).reduce((acc, curr, i) => {
  acc[i] = highOrderSliceReducer(i);
  return acc;
}, {});


const store = createStore(combineReducers(reducers));


const renderResults = [];
window.renderResults = renderResults;


function onAppRendered(id, phase, actualTime, baseTime, startTime, commitTime, interactions = []) {
    if(!Array.isArray(interactions)) {
        interactions = [...interactions]
    }
    renderResults.push({id, phase, actualTime, baseTime, startTime, commitTime, interactions});
}


ReactDOM.render(
    <Profiler id="appProfiler" onRender={onAppRendered}>
  <Provider store={store}>
   <App />
  </Provider>
    </Profiler>,
  document.getElementById('root')
);

function addTweetInRandomSlice() {
  const sliceId = Math.floor(Math.random() * c.NUMBER_OF_SLICES);
  store.dispatch(addTweet(sliceId));
}

setInterval(addTweetInRandomSlice, 13)

setInterval(addTweetInRandomSlice, 21)

setInterval(addTweetInRandomSlice, 34)

setInterval(addTweetInRandomSlice, 55)