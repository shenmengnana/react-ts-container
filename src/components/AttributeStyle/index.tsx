import React, {FC, useEffect, useRef} from 'react';
import './index.less';
import {Form, Input, InputNumber} from 'antd';
import Size from './size';
import Position from './position';
import Href from './href';
import Text from './text';
import {useAppSelector, useAppDispatch} from '@/store';
import {setPageJson, setCompFixJson, update, objectAny} from '@/store/reducers/global';
import {useDebounceFn} from 'ahooks';
const AttributeStyle: FC = () => {
  const dispatch = useAppDispatch();
  const selectObj = useAppSelector(state => state.global['selectObj']);
  const [form] = Form.useForm();
  const attributeChange = useDebounceFn(
    (e: object) => {
      if (!Object.values(e)[0]) return;
      dispatch(update(e));
    },
    {wait: 500},
  );
  useEffect(() => {
    console.log(111, selectObj);
    let position: objectAny = JSON.parse(JSON.stringify(selectObj.position || {}));
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
        {selectObj.type === 'text' && <Text></Text>}
        <Size></Size>
        <Position></Position>
        <Href></Href>
      </Form>
    </div>
  );
};

export default AttributeStyle;
