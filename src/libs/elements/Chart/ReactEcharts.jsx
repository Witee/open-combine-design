import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

/**
  基于 EChart 的常用图表 - 基础
  title、description、children 未定义时将不进行显示

  @author Witee<github.com/Witee>
  @date   2018-07-05
*/

const OCDReactEcharts = (props) => {
  const {
    style,
    ...args
  } = props;

  return (
    <div style={style}>
      <ReactEcharts
        {...args}
      />
    </div>
  );
};


OCDReactEcharts.propTypes = {
  style: PropTypes.object,
};

OCDReactEcharts.defaultProps = {
  style: {},
};

export default OCDReactEcharts;
