import React from 'react';
import { Card, Icon } from 'antd';
import PropTypes from 'prop-types';

// 没有数据时的显示内容

const Placeholder = (props) => {
  const { text, style, icon } = props;

  // 通过 style 修改样式
  const newStyle = Object.assign({}, {
    height: '32em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.43)',
    margin: '0',
    padding: '0',
  }, style);
  return (
    <Card style={newStyle}>
      <Icon type={icon} style={{ marginRight: '0.3333em' }} />
      {text}
    </Card>
  );
};

Placeholder.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
};

Placeholder.defaultProps = {
  text: '暂无数据',
  style: {},
  icon: 'frown-o',
};

export default Placeholder;
