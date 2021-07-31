import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, InputNumber} from 'antd';
const Position = () => {
  return (
    <Space>
      <Form.Item label="上" name="y">
        <InputNumber />
      </Form.Item>
      <Form.Item label="左" name="x">
        <InputNumber />
      </Form.Item>
    </Space>
  );
};

export default Position;
