import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, InputNumber} from 'antd';
const Size = () => {
  return (
    <Space>
      <Form.Item label="宽" name="width">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="高" name="height">
        <InputNumber min={0} />
      </Form.Item>
    </Space>
  );
};

export default Size;
