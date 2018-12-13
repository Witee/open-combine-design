import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Popover, Tooltip } from 'antd';
import Input from '../../elements/Input';

/*
  弹出卡片，内容是输入框
*/


// 弹出内容
class PopContent extends React.Component {
  state = {
    name: null,
    legal: false,
  }

  handleInputChange = (value) => {
    let legal = true;

    // 返回 null 时表示不合法
    if (_.isNull(value)) {
      legal = false;
    }
    this.setState({ name: value, legal });
  }

  render() {
    const {
      submit,
      inputMax,
      inputStyle,
      inputLabelName,
      inputLabelSpan,
      inputWrapperSpan,
      inputHasFeedback,
      inputRequired,
      inputHelp,
      inputRegular,
      inputPlaceholder,
      inputAutoFocus,
    } = this.props;
    const { name, legal } = this.state;

    return (
      <Row>
        <Col>
          <Input
            value={name}
            onChange={this.handleInputChange}
            max={inputMax}
            style={inputStyle}
            labelName={inputLabelName}
            labelSpan={inputLabelSpan}
            wrapperSpan={inputWrapperSpan}
            hasFeedback={inputHasFeedback}
            required={inputRequired}
            help={inputHelp}
            regular={inputRegular}
            placeholder={inputPlaceholder}
            autoFocus={inputAutoFocus}
          />
        </Col>
        <Col offset={6}>
          <Button
            type="primary"
            className="margin-top-bottom-middle"
            disabled={!legal}
            onClick={() => { submit(name); this.setState({ name: null }); }}
          >提交
          </Button>
        </Col>
      </Row>
    );
  }
}
PopContent.propTypes = {
  submit: PropTypes.func.isRequired,
  inputMax: PropTypes.number,
  inputStyle: PropTypes.object,
  inputLabelName: PropTypes.string,
  inputLabelSpan: PropTypes.number,
  inputWrapperSpan: PropTypes.number,
  inputHasFeedback: PropTypes.bool,
  inputRequired: PropTypes.bool,
  inputHelp: PropTypes.string,
  inputRegular: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  inputAutoFocus: PropTypes.bool,
};

PopContent.defaultProps = {
  inputMax: undefined,
  inputStyle: {},
  inputLabelName: undefined,
  inputLabelSpan: 6,
  inputWrapperSpan: 18,
  inputHasFeedback: true,
  inputRequired: true,
  inputHelp: '支持中英文、数字、下划线、减号、空格',
  inputRegular: /^[\u4e00-\u9fa5a-zA-Z0-9-_\s]+$/,
  inputPlaceholder: '请输入内容',
  inputAutoFocus: false,
};


// 下载弹出卡片
// eslint-disable-next-line
class PopoverInput extends React.Component {
  state = {
    visible: undefined,
  }

  onClick = () => {
    const { btnDisabled, btnOnClick } = this.props;
    const { visible } = this.state;
    // 如果按钮被禁用，则不响应点击
    if (!btnDisabled) {
      this.setState({ visible: !visible });
      btnOnClick();
    }
  }

  submit = (value) => {
    const { submit } = this.props;
    this.setState({ visible: false });
    submit(value);
  }

  render() {
    const {
      title, cardStyle, cardPlacement, btnName, btnSize, btnClassName,
      btnType, btnIcon, btnDisabled, btnLoading, btnStyle, tooltipTitle,
      inputMax, inputStyle, inputLabelName, inputLabelSpan,
      inputWrapperSpan, inputHasFeedback, inputRequired, inputHelp,
      inputRegular, inputPlaceholder, inputAutoFocus,
    } = this.props;
    const { visible } = this.state;

    // 如果按钮被禁用，则不显示弹出框
    let popoverVisible = visible;
    if (btnDisabled) {
      popoverVisible = false;
    }
    return (
      <Popover
        overlayStyle={cardStyle}
        placement={cardPlacement}
        title={title}
        content={(
          <PopContent
            submit={this.submit}
            inputMax={inputMax}
            inputStyle={inputStyle}
            inputLabelName={inputLabelName}
            inputLabelSpan={inputLabelSpan}
            inputWrapperSpan={inputWrapperSpan}
            inputHasFeedback={inputHasFeedback}
            inputRequired={inputRequired}
            inputHelp={inputHelp}
            inputRegular={inputRegular}
            inputPlaceholder={inputPlaceholder}
            inputAutoFocus={inputAutoFocus}
          />
        )}
        trigger="click"
        onVisibleChange={this.onClick} // 点击空白处关闭
        visible={popoverVisible}
      >
        <Tooltip title={tooltipTitle}>
          <Button
            icon={btnIcon}
            type={btnType}
            size={btnSize}
            onClick={this.onClick}
            disabled={btnDisabled}
            loading={btnLoading}
            className={btnClassName}
            style={btnStyle}
          >
            {btnName}
          </Button>
        </Tooltip>
      </Popover>
    );
  }
}


PopoverInput.propTypes = {
  submit: PropTypes.func.isRequired,
  title: PropTypes.string,
  cardStyle: PropTypes.object,
  cardPlacement: PropTypes.string,
  tooltipTitle: PropTypes.string,
  btnName: PropTypes.string,
  btnType: PropTypes.string,
  btnSize: PropTypes.string,
  btnIcon: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnLoading: PropTypes.bool,
  btnOnClick: PropTypes.func,
  btnClassName: PropTypes.string,
  btnStyle: PropTypes.object,
  inputMax: PropTypes.number,
  inputStyle: PropTypes.object,
  inputLabelName: PropTypes.string,
  inputLabelSpan: PropTypes.number,
  inputWrapperSpan: PropTypes.number,
  inputHasFeedback: PropTypes.bool,
  inputRequired: PropTypes.bool,
  inputHelp: PropTypes.string,
  inputRegular: PropTypes.object,
  inputPlaceholder: PropTypes.string,
  inputAutoFocus: PropTypes.bool,
};

PopoverInput.defaultProps = {
  title: '请选择',
  cardStyle: undefined,
  cardPlacement: 'bottomRight',
  tooltipTitle: undefined,
  btnName: '保存',
  btnType: 'default',
  btnSize: 'default',
  btnIcon: 'save',
  btnDisabled: false,
  btnLoading: false,
  btnOnClick: () => {},
  btnClassName: '',
  btnStyle: { width: '100%' },
  inputMax: undefined,
  inputStyle: {},
  inputLabelName: undefined,
  inputLabelSpan: 6,
  inputWrapperSpan: 18,
  inputHasFeedback: true,
  inputRequired: true,
  inputHelp: '支持中英文、数字、下划线、减号、空格',
  inputRegular: /^[\u4e00-\u9fa5a-zA-Z0-9-_\s]+$/,
  inputPlaceholder: '请输入内容',
  inputAutoFocus: false,
};

export default PopoverInput;
