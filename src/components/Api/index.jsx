import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const Api = (props) => {
  const { title, subTitle, doc } = props;

  const tableRows = _.map(doc, (r) => (
    <tr key={r}>
      <td>{_.nth(r, 0)}</td>
      <td>{_.nth(r, 1)}</td>
      <td>{_.nth(r, 2)}</td>
      <td>{_.nth(r, 3)}</td>
    </tr>
  ));

  return (
    <Row gutter={16} className="margin-bottom-large">
      <Col span={24} className="margin-bottom-middle">
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </Col>
      <Col span={24}>
        <table className="table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>

          <tbody>
            {tableRows}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

Api.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  doc: PropTypes.array,
};

Api.defaultProps = {
  title: 'API',
  subTitle: '',
  doc: [['argument', 'text', 'type', 'default']],
};
export default Api;
