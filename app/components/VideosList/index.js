/**
 * Created by chocho on 9/15/17.
 */
import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import VideoListItem from 'containers/VideoListItem';

function VideosList({ loading, error, videos }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (videos !== false) {
    return <List items={videos} component={VideoListItem} />;
  }

  return null;
}

VideosList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  videos: PropTypes.any,
};

export default VideosList;
