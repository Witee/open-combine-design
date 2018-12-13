import React from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';

/**
  基于 EChart 的常用图表 - 基础
  title、description、children 未定义时将不进行显示

  @author Witee<github.com/Witee>
  @date   2018-07-05
*/

const OCDReactECharts = (props) => {
  const {
    style,
    ...args
  } = props;

  return (
    <div style={style}>
      <ReactECharts
        {...args}
      />
    </div>
  );
};


OCDReactECharts.propTypes = {
  style: PropTypes.object,
};

OCDReactECharts.defaultProps = {
  style: {},
};

export default OCDReactECharts;
