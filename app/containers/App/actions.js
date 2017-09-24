/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_VIDEOS,
  LOAD_VIDEOS_SUCCESS,
  LOAD_VIDEOS_ERROR,
} from './constants';

/**
 * Load the videos, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_VIDEOS
 */
export function loadVideos() {
  return {
    type: LOAD_VIDEOS,
  };
}

/**
 * Dispatched when the videos are loaded by the request saga
 *
 * @param  {array} videos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function videosLoaded(videos, username) {
  return {
    type: LOAD_VIDEOS_SUCCESS,
    videos,
    username,
  };
}

/**
 * Dispatched when loading the videos fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_VIDEOS_ERROR passing the error
 */
export function videoLoadingError(error) {
  return {
    type: LOAD_VIDEOS_ERROR,
    error,
  };
}

export function selectVideo(currentVideo) {
  return {
    type: 'SELECT_VIDEO',
    currentVideo,
  };
}

export function uploadVideo(video) {
  return {
    type: 'UPLOAD_VIDEO',
    video,
  };
}
