/**
 * Gets the videos of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_VIDEOS } from 'containers/App/constants';
import { videosLoaded, videoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import firebase from 'firebase';

var storageRef = firebase.storage().ref();
var database = firebase.database();

/**
 * Github videos request/response handler
 */
export function* loadVideos() {
  console.log('get videos');
  try {

    yield put(videosLoaded(videos, 'chocho'));
  } catch (err) {
    yield put(videoLoadingError(err));
  }
}

export function* uploadVideo(action) {
  const videoName = action.video.name.split('\\').pop();
  var videoStorageRef = storageRef.child('videos/' + videoName);
  videoStorageRef.put(action.video).then((snapshot, err) => {
    console.log('Upload video', snapshot.val());
    if (err) console.error(err);
    database.ref('videos/').push({
      name: videoName,
      storage_url: snapshot.downloadURL,
    });
  });
}

/**
 * Root saga manages watcher lifecycle
 */
export function* videoData() {
  // Watches for LOAD_VIDEOS actions and calls getVideos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  yield takeLatest(LOAD_VIDEOS, loadVideos);
  yield takeLatest('UPLOAD_VIDEO', uploadVideo);
  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// Bootstrap sagas
export default [
  videoData,
];
