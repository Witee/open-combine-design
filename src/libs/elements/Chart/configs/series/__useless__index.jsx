import React from 'react';
import PropTypes from 'prop-types';
import Pie from './Pie';
import WordCloud from './WordCloud';

/**
  echarts 系列配置项选择器，只支持 pie、wordCloud

  series 只支持仅有一个对象的格式，即 series = [{type: 'pie|wordCloud'}]

  数据保存在 dataset.source 中， wordCloud 使用时需要转换为 [{name: xxx, value: xxx}] 格式

  @author Witee<github.com/Witee>
  @date   2018-12-07
*/

class Series extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (!_.isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  }

  render() {
    const { series, ...args } = this.props;

    /**
      只支持一种格式 series = [{type: 'pie|wordCloud'}]，所以只使用第一个
    */
    const firstSeries = _.get(series, 0, {});
    const type = _.get(firstSeries, 'type', null);
    const seriesEditor = <p>series 的数据格式不正确</p>;

    if (_.toLower(type) === 'pie') {
      return <Pie series={series} {...args} />;
    } if (_.toLower(type) === 'wordcloud') {
      return <WordCloud series={series} {...args} />;
    }

    return (
      seriesEditor
    );
  }
}


Series.propTypes = {
  series: PropTypes.arrayOf(PropTypes.object),
};

Series.defaultProps = {
  series: undefined,
};

export default Series;
