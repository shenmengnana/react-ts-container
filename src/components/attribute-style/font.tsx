import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Space, InputNumber, Radio, RadioChangeEvent, Popover} from 'antd';
import {SketchPicker} from 'react-color';
import {useBoolean} from 'ahooks';
interface colorType {
  rgb: rgbColorType;
}
interface rgbColorType {
  r: number;
  g: number;
  b: number;
  a: number;
}
interface PopoverColorProps {
  value: rgbColorType;
  onChange?: (value: colorType) => void;
}
const PopoverColor: React.FC<PopoverColorProps> = ({value, onChange}) => {
  return (
    <Popover content={<SketchPicker color={value} onChangeComplete={onChange}></SketchPicker>}>
      <div className="select-color">
        <p style={{height: '100%', backgroundColor: `rgba(${Object.values(value)})`}}></p>
      </div>
    </Popover>
  );
};
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
