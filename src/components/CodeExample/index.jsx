import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tag, Button } from 'antd';

class CodeExample extends React.Component {
  state= {
    showCode: false,
  }

  handleShowCodeClick = () => {
    const { showCode } = this.state;
    this.setState({ showCode: !showCode });
  }

  render() {
    const { title, component, code } = this.props;
    const { showCode } = this.state;

    const viewContainer = {
      minHeight: '20em',
      padding: '1.3333em',
      border: '1px solid #d9d9d9',
      bordeRadius: '0.3333em',
    };
    const viewCode = {
      backgroundColor: '#f6f8fa',
      minHeight: '20em',
      padding: '1.3333em',
      border: '1px solid #d9d9d9',
      bordeRadius: '0.3333em',
      overflow: 'auto',
    };

    return (
      <Row gutter={16} style={viewContainer}>
        <Col span={24} className="margin-bottom-middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tag className="cursor-default">{title}</Tag>
          <Button
            size="small"
            icon={showCode ? 'code' : 'code-o'}
            onClick={this.handleShowCodeClick}
          />
        </Col>
        <Col span={showCode ? 12 : 24}>
          {component}
        </Col>
        <Col span={showCode ? 12 : 0} style={viewCode}>
          {code}
        </Col>
      </Row>
    );
  }
}

CodeExample.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
  code: PropTypes.object.isRequired,
};
export default CodeExample;
