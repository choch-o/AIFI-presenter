/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_VIDEOS_SUCCESS,
  LOAD_VIDEOS,
  LOAD_VIDEOS_ERROR,
  SELECT_VIDEO,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    videos: false,
  },
  currentVideo: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VIDEOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'videos'], false);
    case LOAD_VIDEOS_SUCCESS:
      return state
        .setIn(['userData', 'videos'], action.videos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_VIDEOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case 'SELECT_VIDEO':
      return state
        .set('currentVideo', action.currentVideo);
    default:
      return state;
  }
}

export default appReducer;
