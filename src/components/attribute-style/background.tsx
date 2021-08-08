import React, {FC, useEffect, useState} from 'react';
import {Form, Radio, Button, Space, message} from 'antd';
import './index.less';
import ImgInput from '../attribute-style/img-input';
import {useAppSelector, useAppDispatch} from '@/store';
import {useDebounceFn} from 'ahooks';
import {setPageStyle} from '@/store/reducers/global';
import {ObjectAny, SelectObjType, PageStyleType} from '@/store/reducers/index.d';
import PopoverColor, {colorType, rgbColorType} from '../popover-color';
import {BackgroundProps} from './index.d';
const Background = ({form, upload}: BackgroundProps) => {
  const [imgSrc, setimgSrc] = useState('');
  const [colorArr, setcolorArr] = useState<Array<string>>(['rgba(255,255,255,1)']);
  const handleChange = (color: colorType, index: number) => {
    let colors = [...colorArr];
    colors[index] = `rgba(${Object.values(color.rgb)})`;
    setcolorArr(colors);
  };
  const normColor = (e: colorType) => {
    return `rgba(${Object.values(e.rgb)})`;
  };
  const addColor = (type: number) => {
    let colors = [...colorArr];
    if (type === -1) {
      colors.pop();
    } else {
      colors.push('rgba(255,255,255,1)');
    }
    setcolorArr(colors);
  };
  const imgUpload = useDebounceFn(
    (e: PageStyleType) => {
      setimgSrc(e.backgroundImage);
      upload({backgroundImage: `url(${e.backgroundImage})`});
    },
    {wait: 500},
  );
  useEffect(() => {
    let obj: any = {};
    if (colorArr.length > 1) {
      obj = {backgroundImage: `linear-gradient(${colorArr.join(',')})`};
    } else {
      obj = {backgroundColor: colorArr[0], backgroundImage: ''};
      if (imgSrc) {
        obj.backgroundImage = `url(${imgSrc})`;
      }
    }
    upload(obj);
  }, [colorArr]);
  return (
    <>
      <Form.Item label="背景颜色" name="backgroundColor" valuePropName="rgb" getValueFromEvent={normColor}>
        <Space>
          {colorArr.map((item, index) => (
            <PopoverColor
              value={item}
              onChange={e => {
                handleChange(e, index);
              }}
              key={index}
            ></PopoverColor>
          ))}
          {colorArr.length < 4 && (
            <div
              className="add-color flex-center-center"
              onClick={() => {
                addColor(1);
              }}
            >
              +
            </div>
          )}
          {colorArr.length > 1 && (
            <div
              className="add-color flex-center-center"
              onClick={() => {
                addColor(-1);
              }}
            >
              -
            </div>
          )}
        </Space>
      </Form.Item>
      <ImgInput label="背景图片" name="backgroundImage" form={form} upload={imgUpload.run} src={imgSrc}></ImgInput>
      {imgSrc && (
        <>
          <Form.Item label="背景尺寸" name="backgroundSize">
            <Radio.Group>
              <Radio value={'100% auto'}>宽度撑满</Radio>
              <Radio value={'auto 100%'}>高度撑满</Radio>
              <Radio value={'100% 100%'}>拉伸撑满</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="背景重复" name="backgroundRepeat">
            <Radio.Group>
              <Radio value={'no-repeat'}>不复制</Radio>
              <Radio value={'repeat-x'}>水平复制</Radio>
              <Radio value={'repeat-y'}>垂直复制</Radio>
              <Radio value={'repeat'}>双向复制</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
    </>
  );
};

export default Background;
