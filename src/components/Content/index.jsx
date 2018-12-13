import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import ReactMarkdown from 'react-markdown';
import CodeExample from 'components/CodeExample';
import Api from 'components/Api';

/**
  内容的模板
*/

const Content = (props) => {
  const { title, subTitle, whenUse, codes, apiDocs } = props;

  const examples = _.map(codes, (code) => (
    <Col key={code.title} className="margin-bottom-middle">
      <CodeExample
        title={code.title}
        component={code.example}
        code={<ReactMarkdown source={code.code} />}
      />
    </Col>
  ));
  return (
    <Row>
      <Col>
        <h2>{title}</h2>
      </Col>
      <Col className="margin-bottom-huge">
        {subTitle}
      </Col>

      <Col>
        <h2>何时使用</h2>
      </Col>
      <Col className="margin-bottom-huge">
        {whenUse}
      </Col>

      <Col>
        <Row gutter={16}>
          <Col>
            <h2>代码演示</h2>
          </Col>

          {examples}
        </Row>
      </Col>

      <Col className="margin-top-huge">
        {_.map(apiDocs, (doc) => (<Api key={doc.title || 'API'} title={doc.title || 'API'} subTitle={doc.subTitle || ''} doc={doc.doc} />))}
      </Col>

    </Row>
  );
};

Content.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  whenUse: PropTypes.string,
  codes: PropTypes.array,
  apiDocs: PropTypes.array,
};

Content.defaultProps = {
  title: 'API',
  subTitle: '',
  whenUse: '',
  codes: [],
  apiDocs: [
    {
      title: 'API',
      doc: [
        ['-', '-', '-', '-'],
      ],
    },
  ],
};
export default Content;
