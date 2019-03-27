/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Modal,
  Button,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Radio,
  Upload,
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@connect(({ info, loading }) => ({
  info,
  loading: loading.models.info,
}))
@Form.create()
class EditDoc extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    confirmLoading: false,
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidMount() {
    const { form } = this.props;
    form.setFieldsValue({
      name: 'wzj',
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  hideEditModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'info/changeEditDocStatus',
    });
  };

  handleEditModal = () => {
    const { dispatch, info } = this.props;
    dispatch({
      type: 'info/changeEditDocStatusLoading',
    });
    setTimeout(() => {
      dispatch({
        type: 'info/changeEditDocStatus',
      });
      dispatch({
        type: 'info/changeEditDocStatusLoading',
      });
    }, 4000);
  };

  render() {
    const {
      visibleStatus,
      info: { editDocStatusLoading },
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <Modal
          title="医生信息"
          visible={visibleStatus}
          onOk={this.handleEditModal}
          confirmLoading={editDocStatusLoading}
          onCancel={this.hideEditModal}
          width="60%"
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的姓名!',
                  },
                ],
              })(<Input placeholder="请输入您的姓名!" />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex', {
                rules: [
                  {
                    required: true,
                    message: '请选择您的性别!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <RadioGroup initialValue="a">
                  <RadioButton value="a">男</RadioButton>
                  <RadioButton value="b">女</RadioButton>
                  <RadioButton value="c">未知</RadioButton>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item
              label="Upload"
              // extra="地址"
            >
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> 点击上传头像
                  </Button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item label="职称">
              {getFieldDecorator('work', {
                rules: [{ required: true, message: '请输入您的职称！', whitespace: true }],
              })(<Input placeholder="请输入您的职称!" />)}
            </Form.Item>
            <Form.Item label="教学职务">
              {getFieldDecorator('teachWork', {
                rules: [{ required: true, message: '请输入教学职务', whitespace: true }],
              })(<Input placeholder="请输入教学职务" />)}
            </Form.Item>
            <Form.Item label="导师职务">
              {getFieldDecorator('leadWork', {
                rules: [{ required: true, message: '请输入导师职务', whitespace: true }],
              })(<Input placeholder="请输入导师职务" />)}
            </Form.Item>
            <Form.Item label="职务">
              {getFieldDecorator('otherWork', {
                rules: [{ required: true, message: '请输入职务', whitespace: true }],
              })(<Input placeholder="请输入职务" />)}
            </Form.Item>
            <Form.Item label="其他职务">
              {getFieldDecorator('other', {
                rules: [{ required: true, message: '请输入其他职务', whitespace: true }],
              })(<Input placeholder="请输入其他职务" />)}
            </Form.Item>
            <Form.Item label="特长简介">
              {getFieldDecorator('e', {
                rules: [{ required: true, message: '请输入特长简介', whitespace: true }],
              })(<Input placeholder="请输入特长简介" />)}
            </Form.Item>
            <Form.Item label="专业特长">
              {getFieldDecorator('c', {
                rules: [{ required: true, message: '请输入专业特长', whitespace: true }],
              })(<Input placeholder="请输入专业特长" />)}
            </Form.Item>
            <Form.Item label="学术任职">
              {getFieldDecorator('b', {
                rules: [{ required: true, message: '请输入学术任职', whitespace: true }],
              })(<Input placeholder="请输入学术任职" />)}
            </Form.Item>
            <Form.Item label="科学研究">
              {getFieldDecorator('c', {
                rules: [{ required: true, message: '请输入科学研究', whitespace: true }],
              })(<Input placeholder="请输入科学研究" />)}
            </Form.Item>
            <Form.Item label="教育培训">
              {getFieldDecorator('u', {
                rules: [{ required: true, message: '请输入教育培训', whitespace: true }],
              })(<Input placeholder="请输入教育培训" />)}
            </Form.Item>
            <Form.Item label="表彰奖励">
              {getFieldDecorator('k', {
                rules: [{ required: true, message: '请输入表彰奖励', whitespace: true }],
              })(<Input placeholder="请输入表彰奖励" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default EditDoc;
