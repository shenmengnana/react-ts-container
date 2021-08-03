import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, InputNumber, Radio} from 'antd';
import PopoverColor, {colorType} from '../popover-color';
const Font = () => {
  const [color, setColor] = useState({r: 0, g: 0, b: 0, a: 1});
  const handleChange = (color: colorType) => {
    setColor(color.rgb);
  };
  const normColor = (e: any) => {
    return `rgba(${Object.values(e.rgb)})`;
  };
  return (
    <>
      <Form.Item label="字体大小" name="fontSize">
        <InputNumber min={10} />
      </Form.Item>
      <Form.Item label="字体加粗" name="fontWeight">
        <Radio.Group>
          <Radio value={'bold'}>加粗</Radio>
          <Radio value={'normal'}>不加粗</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="字体颜色" name="color" valuePropName="rgb" getValueFromEvent={normColor}>
        <PopoverColor value={color} onChange={handleChange}></PopoverColor>
      </Form.Item>
    </>
  );
};

export default Font;
