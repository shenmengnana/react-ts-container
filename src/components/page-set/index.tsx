import React, {FC, useEffect, useState} from 'react';
import {Form} from 'antd';
import './index.less';
import ImgInput from '../attribute-style/img-input';
import {useAppSelector, useAppDispatch} from '@/store';
import {useDebounceFn} from 'ahooks';
import {setPageStyle} from '@/store/reducers/global';
import {ObjectAny, SelectObjType} from '@/store/reducers/index.d';
import PopoverColor, {colorType} from '../popover-color';
const PageSet: FC = () => {
  const [imgSrc, setimgSrc] = useState('');
  const [color, setColor] = useState({r: 0, g: 0, b: 0, a: 1});
  const dispatch = useAppDispatch();
  const pageStyle = useAppSelector(state => state.global.pageStyle);
  const [form] = Form.useForm();
  const attributeChange = useDebounceFn(
    (e: SelectObjType) => {
      let key: string = Object.keys(e)[0];
      if (!key && key !== 'value') return;
      setimgSrc(e.value);
      dispatch(setPageStyle({...pageStyle, background: `rgba(${Object.values(color)}) url(${e.value})`}));
    },
    {wait: 500},
  );
  const handleChange = (color: colorType) => {
    setColor(color.rgb);
    dispatch(setPageStyle({...pageStyle, background: `rgba(${Object.values(color.rgb)}) url(${imgSrc})`}));
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
        <ImgInput label="背景图片" form={form} update={attributeChange.run} src={imgSrc}></ImgInput>
      </Form>
    </div>
  );
};

export default PageSet;
