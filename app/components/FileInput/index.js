/**
 * Created by chocho on 9/15/17.
 */
import React, { PropTypes, Children } from 'react';

import StyledInput from './StyledInput';
import StyledLabel from './StyledLabel';
import Wrapper from '../Button/Wrapper';

function FileInput(props) {
  return (
    <Wrapper>
      <StyledInput
        type="file" name="file" id="file" accept=".mp4"
        onChange={props.onChange}
      />
      <StyledLabel htmlFor="file">
        {Children.toArray(props.children)}
      </StyledLabel>
    </Wrapper>
  );
}

FileInput.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

export default FileInput;
