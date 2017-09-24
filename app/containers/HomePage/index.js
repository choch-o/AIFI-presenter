/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import firebase from 'firebase';
import { Link } from 'react-router';


import H2 from 'components/H2';
import FileInput from 'components/FileInput';
import { selectVideo, uploadVideo } from 'containers/App/actions';
import { makeSelectCurrentVideo } from 'containers/App/selectors';
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';


var storageRef = firebase.storage().ref();
var database = firebase.database();

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
    this.loadVideos = this.loadVideos.bind(this);
    this.onVideoUpload = this.onVideoUpload.bind(this);
    this.onVideoClick = this.onVideoClick.bind(this);
  }
  /**
   * when initial state username is not null, submit the form to load videos
   */
  componentDidMount() {
    this.loadVideos();
  }

  onVideoUpload(e) {
    const video = e.target.files[0];
    const videoName = video.name.split('\\').pop();
    var videoStorageRef = storageRef.child('videos/' + videoName);
    videoStorageRef.put(video).then((snapshot, err) => {
      if (err) console.error(err);
      database.ref('videos/').push({
        name: videoName,
        storage_url: snapshot.downloadURL,
      });
    });
  }

  onVideoClick(video) {
    this.props.onVideoSelect(video);
  }
  loadVideos() {
    const context = this;
    database.ref('videos').on('value', (snapshot) => {
      const newVideos = [];
      snapshot.forEach((childSnapshot) => {
        const video = childSnapshot.val();
        video.key = childSnapshot.key;
        newVideos.push(video);
      });
      context.setState({
        videos: newVideos,
      });
    });
  }

  render() {
    const videoItems = this.state.videos.map((video) => {
      return (
        <div
          key={video.key}
          onClick={() => this.onVideoClick(video)}
        >
          <Link
            to="/presentation"
          >{video.name}</Link>
        </div>
      );
    });
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.projectIntroHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.projectIntroMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.presentationListHeader} />
            </H2>
            <FileInput onChange={this.onVideoUpload}>
              <FormattedMessage {...messages.presentationAddMessage} />
            </FileInput>
            <div>{videoItems}</div>
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  videos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  username: React.PropTypes.string,
  currentVideo: React.PropTypes.object,
  onVideoSelect: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onVideoSelect: (video) => dispatch(selectVideo(video)),
  };
}

const mapStateToProps = createStructuredSelector({
  currentVideo: makeSelectCurrentVideo(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
