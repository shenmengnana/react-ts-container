import React, {FC, useEffect, useState} from 'react';
import {Form, Radio, Button, Space, message} from 'antd';
import './index.less';
import {useAppSelector, useAppDispatch} from '@/store';
import {useDebounceFn} from 'ahooks';
import {setPageStyle} from '@/store/reducers/global';
import {ObjectAny, SelectObjType, PageStyleType} from '@/store/reducers/index.d';
import PopoverColor, {colorType, rgbColorType} from '../popover-color';
import Background from '@/components/attribute-style/background';
const PageSet: FC = () => {
  const dispatch = useAppDispatch();
  const pageStyle = useAppSelector(state => state.global.pageStyle);
  const [form] = Form.useForm();
  const attributeChange = useDebounceFn(
    (e: PageStyleType) => {
      dispatch(setPageStyle({...pageStyle, ...e}));
    },
    {wait: 500},
  );
  return (
    <Form form={form} className="page-set" onValuesChange={attributeChange.run}>
      <Background form={form} upload={attributeChange.run}></Background>
    </Form>
  );
};

export default PageSet;
