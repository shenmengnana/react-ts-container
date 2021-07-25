import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, Input} from 'antd';
const Text = () => {
  return (
    <Space>
      <Form.Item label="文本内容" name="value">
        <Input.TextArea />
      </Form.Item>
    </Space>
  );
};

export default Text;
