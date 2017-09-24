/**
 * Created by chocho on 9/24/17.
 */
import { createSelector } from 'reselect';

const selectPresentation = (state) => state.get('presentation');

const makeSelectSelectedFeedback = () => createSelector(
  selectPresentation,
  (presentationState) => presentationState.get('selectedFeedback')
);

export {
  selectPresentation,
  makeSelectSelectedFeedback,
};
