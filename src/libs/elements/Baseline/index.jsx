import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


/**
  我是有底线的

  @author Witee<github.com/Witee>
  @date   2018-12-05
*/
const Baseline = (props) => {
  const { text } = props;

  return (
    <div className="baseline-wrapper">
      <span className="baseline-line"></span>
      <span className="baseline-content description-text">{text}</span>
      <span className="baseline-line"></span>
    </div>
  );
};

Baseline.propTypes = {
  text: PropTypes.string,
};

Baseline.defaultProps = {
  text: '我是有底线的',
};

export default Baseline;
