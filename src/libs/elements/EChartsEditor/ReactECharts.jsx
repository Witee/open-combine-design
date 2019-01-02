import React from 'react';
import EChartsForReact from 'echarts-for-react';
import PropTypes from 'prop-types';

const ReactECharts = (props) => {
  const { option, theme, height, notMerge, lazyUpdate } = props;

  const textStyle = {
    fontFamily: '"Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  const newOption = _.merge({}, { textStyle }, option);

  return (
    <EChartsForReact
      option={newOption}
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
