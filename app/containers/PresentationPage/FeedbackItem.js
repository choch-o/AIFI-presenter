/**
 * Created by chocho on 9/24/17.
 */
import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectFeedback } from './actions';
import { makeSelectSelectedFeedback } from './selectors';
import Wrapper from './Wrapper';

const TextSection = styled.span`
  cursor: pointer;
  -webkit-flex: 1;
  flex: 1;
`;

const IconSection = styled.span`
  display: flex;
  flex-direction: column;
`;

const IconButton = styled.span`
  cursor: pointer;
  margin-right: 5px;
`;

export class FeedbackItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const timestamp = new Date(this.props.feedback.timestamp * 1000).toISOString().substr(14, 5);
    return (
      <Wrapper>
        <TextSection
          onClick={() => {
            this.props.onFeedbackItemClick(this.props.feedback);
          }}
        >
          {timestamp} {this.props.feedback.comment}
          <br />
          <i>by {this.props.feedback.username}</i>
        </TextSection>
        <IconSection>
          <IconButton>
            <FontAwesome
              name="question-circle"
            />
          </IconButton>
          <IconButton>
            <FontAwesome
              name="angle-down"
            />
          </IconButton>
        </IconSection>
      </Wrapper>
    );
  }
}

FeedbackItem.propTypes = {
  feedback: React.PropTypes.object,
  onFeedbackClick: React.PropTypes.func,
  onFeedbackItemClick: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onFeedbackClick: (feedback) => dispatch(selectFeedback(feedback)),
  };
}

const mapStateToProps = createStructuredSelector({
  selectedFeedback: makeSelectSelectedFeedback(),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackItem);
