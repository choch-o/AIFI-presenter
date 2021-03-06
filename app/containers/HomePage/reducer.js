/*
 * HomeReducer
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
  UPLOAD_VIDEO,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  videos: [],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { ...state, selectedVideo: action.video};
    default:
      return state;
  }
}

export default homeReducer;
