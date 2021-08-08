import React, {useState, useEffect} from 'react';
import {Popover} from 'antd';
import {SketchPicker} from 'react-color';
import './index.less';
export interface colorType {
  rgb: rgbColorType;
}
export interface rgbColorType {
  r: number;
  g: number;
  b: number;
  a: number;
}
interface PopoverColorProps {
  value: string;
  onChange?: (value: colorType) => void;
}
const PopoverColor: React.FC<PopoverColorProps> = ({value, onChange}) => {
  return (
    <Popover content={<SketchPicker color={value} onChangeComplete={onChange}></SketchPicker>}>
      <div className="select-color">
        <p style={{height: '100%', backgroundColor: value}}></p>
      </div>
    </Popover>
  );
};
export default PopoverColor;
