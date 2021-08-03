import React, {useState, useEffect} from 'react';
import {Popover} from 'antd';
import {SketchPicker} from 'react-color';
import './index.less';
export interface colorType {
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
export default PopoverColor;
