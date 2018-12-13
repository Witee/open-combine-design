import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

/**
  常用布局中是基本的使用方法，目的是统一工具栏与内容的间隔

  @author Witee<github.com/Witee>
  @date   2018-07-04
*/

const Layout = (props) => {
  const {
    style,
    toolbar,
    children,
  } = props;

  return (
    <Row style={style}>
      <Col className="margin-bottom-middle">{toolbar}</Col>
      <Col>{children}</Col>
    </Row>
  );
};


Layout.propTypes = {
  style: PropTypes.object,
  toolbar: PropTypes.node,
  children: PropTypes.node,
};

Layout.defaultProps = {
  style: {},
  toolbar: <div style={{ backgroundColor: 'yellow', minHeight: '3em', minWidth: '35em' }}>toolbar</div>,
  children: <div style={{ backgroundColor: 'grey', minHeight: '15em', minWidth: '35em' }}>children</div>,
};

export default Layout;
