import React from 'react';
import EChartsForReact from 'echarts-for-react';
import PropTypes from 'prop-types';

const ReactECharts = (props) => {
  const { option, theme, height, notMerge, lazyUpdate } = props;
  return (
    <EChartsForReact
      option={option}
      theme={theme}
      style={{ height: `${height}px` }}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
    />
  );
};

ReactECharts.propTypes = {
  option: PropTypes.object,
  theme: PropTypes.string,
  height: PropTypes.number,
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
};

ReactECharts.defaultProps = {
  option: {},
  theme: 'default',
  height: 420,
  notMerge: false,
  lazyUpdate: false,
};

export default ReactECharts;
