import React, {FC, useEffect, useState} from 'react';
import './index.less';
import {Form, Input, InputNumber} from 'antd';
import Size from './size';
import Position from './position';
import Href from './href';
import TextInput from './text-input';
import ImgInput from './img-input';
import Font from './font';
import {useAppSelector, useAppDispatch} from '@/store';
import {setPageJson, setCompFixJson, update} from '@/store/reducers/global';
import {ObjectAny, SelectObjType} from '@/store/reducers/index.d';
import {useDebounceFn} from 'ahooks';
const AttributeStyle: FC = () => {
  const [imgSrc, setimgSrc] = useState('');
  const dispatch = useAppDispatch();
  const selectObj = useAppSelector(state => state.global.selectObj);
  const [form] = Form.useForm();
  const attributeChange = useDebounceFn(
    (e: SelectObjType) => {
      let key: string = Object.keys(e)[0];
      if (!key) return;
      if (selectObj.type === 'img' && key === 'value') {
        setimgSrc(e[key]);
      }
      dispatch(update(e));
    },
    {wait: 500},
  );
  useEffect(() => {
    let position: ObjectAny = JSON.parse(JSON.stringify(selectObj.position || {}));
    if (selectObj.compType === 'static') {
      position.x = selectObj.style.marginLeft || 0;
      position.y = selectObj.style.marginTop || 0;
    }
    let fields: any = {
      ...selectObj,
      ...selectObj.style,
      ...position,
    };
    form.setFieldsValue(fields);
  }, [selectObj]);
  return (
    <div className="attribute-style">
      <Form form={form} name="attributeForm" onValuesChange={attributeChange.run}>
        {selectObj.type === 'text' && <TextInput></TextInput>}
        {selectObj.type === 'img' && <ImgInput form={form} update={attributeChange.run} src={imgSrc}></ImgInput>}
        <Size></Size>
        <Position></Position>
        <Href></Href>
        <Font></Font>
      </Form>
    </div>
  );
};

export default AttributeStyle;
