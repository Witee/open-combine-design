import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

/**
  基于 EChart 的常用图表 - 基础
  title、description、children 未定义时将不进行显示

  @author Witee<github.com/Witee>
  @date   2018-07-05
*/

const Base = (props) => {
  const {
    style,
    titleStyle,
    title,
    descriptionStyle,
    description,
    contentStyle,
    children,
  } = props;

  return (
    <Row style={style}>
      { (!_.isUndefined(title) || !_.isNull(title))
        ? (
          <Col className="margin-top-bottom-middle" style={titleStyle}>
            {title}
          </Col>
        ) : null
      }

      { (!_.isUndefined(description) || !_.isNull(description))
        ? (
          <Col className="margin-bottom-middle" style={descriptionStyle}>
            {description}
          </Col>
        ) : null
      }

      { (!_.isUndefined(children) || !_.isNull(children))
        ? (
          <Col style={contentStyle}>
            {children}
          </Col>
        ) : null
      }
    </Row>
  );
};


Base.propTypes = {
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.node,
  descriptionStyle: PropTypes.object,
  description: PropTypes.node,
  contentStyle: PropTypes.object,
  children: PropTypes.node,
};

Base.defaultProps = {
  style: {},
  titleStyle: {},
  title: undefined,
  descriptionStyle: {},
  description: undefined,
  contentStyle: {},
  children: undefined,
};

export default Base;
