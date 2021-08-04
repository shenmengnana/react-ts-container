import React, {FC, useEffect, useState} from 'react';
import {Form, Radio, Checkbox} from 'antd';
import './index.less';
import ImgInput from '../attribute-style/img-input';
import {useAppSelector, useAppDispatch} from '@/store';
import {useDebounceFn} from 'ahooks';
import {setPageStyle} from '@/store/reducers/global';
import {ObjectAny, SelectObjType, PageStyleType} from '@/store/reducers/index.d';
import PopoverColor, {colorType} from '../popover-color';
const PageSet: FC = () => {
  const [imgSrc, setimgSrc] = useState('');
  const [color, setColor] = useState({r: 255, g: 255, b: 255, a: 1});
  const dispatch = useAppDispatch();
  const pageStyle = useAppSelector(state => state.global.pageStyle);
  const [form] = Form.useForm();
  const attributeChange = useDebounceFn(
    (e: PageStyleType) => {
      e.backgroundImage && setimgSrc(e.backgroundImage);
      dispatch(setPageStyle({...pageStyle, ...e}));
    },
    {wait: 500},
  );
  const handleChange = (color: colorType) => {
    setColor(color.rgb);
    attributeChange.run({backgroundColor: `rgba(${Object.values(color.rgb)})`});
  };
  const normColor = (e: any) => {
    return `rgba(${Object.values(e.rgb)})`;
  };
  return (
    <div className="page-set">
      <Form.Item label="背景颜色" name="backgroundColor" valuePropName="rgb" getValueFromEvent={normColor}>
        <PopoverColor value={color} onChange={handleChange}></PopoverColor>
      </Form.Item>
      <Form form={form} onValuesChange={attributeChange.run}>
        <ImgInput label="背景图片" name="backgroundImage" form={form} update={attributeChange.run} src={imgSrc}></ImgInput>
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
      </Form>
    </div>
  );
};

export default PageSet;
