/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Line } from 'react-chartjs';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import firebase from 'firebase';

// import { selectVideo } from 'containers/App/actions';
import { makeSelectCurrentVideo } from 'containers/App/selectors';
// import { loadFeedback } from 'actions';
// import { makeSelectFeedbackList } from 'selectors';

import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import FeedbackItem from './FeedbackItem';
import FeedbackList from './FeedbackList';
import { makeSelectSelectedFeedback } from './selectors';

import 'react-tabs/style/react-tabs.css';

var database = firebase.database();

const VideoContainer = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  width: 800;
  height: 450;
`;
const SelectedArea = (props) => {
  const SelectedAreaPrimitive = styled.div`
    position: absolute;
    visibility: ${props.isSpatial ? 'show' : 'hidden'};
    width: ${props.data.width};
    height: ${props.data.height};
    left: ${props.data.left};
    top: ${props.data.top};
    border: 3px solid red;
    z-index: 2;
  `;
  return <SelectedAreaPrimitive />;
};

export class Presentation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      isSpatial: false,
      selectedArea: {
        left: '0%',
        top: '0%',
        width: '0%',
        height: '0%',
      },
    };
    this.loadFeedback = this.loadFeedback.bind(this);
    this.addFeedback = this.addFeedback.bind(this);
    this.updatePlayhead = this.updatePlayhead.bind(this);
  }

  componentDidMount() {
    this.loadFeedback();
  }
  onGraphClick(evt) {
    console.log(evt);
  }
  loadFeedback() {
    const context = this;
    database.ref(`videos/${this.props.currentVideo.key}/feedback`).on('value', (snapshot) => {
      const newFeedback = [];
      snapshot.forEach((childSnapshot) => {
        const feedback = childSnapshot.val();
        feedback.key = childSnapshot.key;
        newFeedback.push(feedback);
      });
      context.setState({
        feedback: newFeedback,
      });
    });
  }
  // dummy function for testing purpose
  addFeedback() {
    var feedbackData = {
      comment: 'Dummy feedback',
      username: 'chocho',
      timestamp: 5,
      left: 0.1,
      top: 0.7,
      width: 0.4,
      height: 0.1,
    };
    var newFeedbackKey = database.ref(`videos/${this.props.currentVideo.key}`).child('feedback').push().key;
    var updates = {};
    updates[`/videos/${this.props.currentVideo.key}/feedback/${newFeedbackKey}`] = feedbackData;
    database.ref().update(updates);
  }
  updatePlayhead(feedback) {
    console.log('Selected Feedback', feedback);
    console.log('Ref video', this.video);
    this.video.currentTime = feedback.timestamp;
    this.setState({
      isSpatial: true,
      selectedArea: {
        left: `${(feedback.left * 100).toString()}%`,
        top: `${(feedback.top * 100).toString()}%`,
        width: `${(feedback.width * 100).toString()}%`,
        height: `${(feedback.height * 100).toString()}%`,
      },
    });
  }
  render() {
    const chartData = {
      labels: ['00:00', '00:01', '00:02', '00:09'],
      datasets: [{
        label: '# of Feedback',
        data: [{
          x: '00:00',
          y: 2,
        }, {
          x: '00.02',
          y: 10,
        }],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 12,
        pointHitRadius: 10,
      }],
    };

    const chartOptions = {
      onClick: this.onGraphClick,
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 0,
        },
      },
      scales: {
        xAxis: [{
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            displayFormats: {
              second: 'mm:ss a',
            },
          },
        }],
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero:true,
          },
        }],
      },
    };
    const feedbackItems = this.state.feedback.map((feedback) => {
      console.log(feedback);
      return (
        <FeedbackItem
          feedback={feedback}
          key={feedback.key}
          onFeedbackItemClick={this.updatePlayhead}
        />
      );
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Helmet
          title="Presentation"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <div style={{ flex: 1 }}>
          <H2>
            {this.props.currentVideo.name}
          </H2>
          <VideoContainer>
            <video ref={(ref) => { this.video = ref; }} width="100%" height="100%" controls>
              <source src={this.props.currentVideo.storage_url} type="video/mp4" />
            </video>
            <SelectedArea isSpatial={this.state.isSpatial} data={this.state.selectedArea} />
          </VideoContainer>
          <Line data={chartData} options={chartOptions} width="600" height="250"></Line>
        </div>
        <div style={{ flex: 1, margin: '2em 2em' }}>
          <Tabs>
            <TabList>
              <Tab>Feedback</Tab>
              <Tab>Prompt</Tab>
              <Tab>Questions</Tab>
            </TabList>
            <TabPanel>
              <FeedbackList>
                {feedbackItems}
              </FeedbackList>
            </TabPanel>
            <TabPanel>
              <p>Prompt</p>
            </TabPanel>
            <TabPanel>
              <p>Questions</p>
            </TabPanel>
          </Tabs>
          <div onClick={this.addFeedback}>Add feedback</div>
        </div>
      </div>
    );
  }
}

Presentation.propTypes = {
  currentVideo: React.PropTypes.object,
  selectedFeedback: React.PropTypes.object,
  // feedbackList: React.PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    // loadFeedback: () => dispatch(loadFeedback),
  };
}

const mapStateToProps = createStructuredSelector({
  currentVideo: makeSelectCurrentVideo(),
  selectedFeedback: makeSelectSelectedFeedback(),
  // feedbackList: makeSelectFeedbackList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
