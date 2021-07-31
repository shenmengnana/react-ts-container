import React, {FC, useEffect, useState} from 'react';
import {Button, Space, Collapse, Form, InputNumber, Divider} from 'antd';
import './index.less';
import {CaretRightOutlined, DeleteOutlined} from '@ant-design/icons';
import {useAppSelector, useAppDispatch} from '@/store';
import {update} from '@/store/reducers/global';
import {AddAnimateListProps, AnimateChilrenType} from './index.d';
const {Panel} = Collapse;

interface AnimateListProps {
  list: Array<AddAnimateListProps>;
  onUpdate: (e: any, i: number) => void;
  onDel: HeaderProps['onDel'];
}
interface HeaderProps {
  index: number;
  item: AnimateChilrenType;
  onClick: (i: number) => void;
  onDel: (i: number) => void;
}
const AnimateHeader = ({index, item, onClick, onDel}: HeaderProps) => {
  return (
    <div className="animate-list-header flex-start-center">
      <div className="header-title">动画{index + 1}</div>
      <div className="header-label">{item.label}</div>
      <Button
        className="header-play"
        icon={<CaretRightOutlined />}
        type="primary"
        size="small"
        onClick={e => {
          e.stopPropagation();
          onClick(index);
        }}
      ></Button>
      <Button
        className="header-del"
        icon={<DeleteOutlined />}
        danger
        size="small"
        onClick={e => {
          e.stopPropagation();
          onDel(index);
        }}
      ></Button>
    </div>
  );
};
const AnimateList = ({list, onDel, onUpdate}: AnimateListProps) => {
  const [activeIndex, setactiveIndex] = useState([] as string | string[]);
  const dispatch = useAppDispatch();
  const panelChange = (key: string | string[]) => {
    setactiveIndex(key);
  };
  const animatePlay = (index: number) => {
    const {animationInfo, value} = list[index];
    console.log('animatePlay', animationInfo);
    let animateInfo = {
      animationName: value,
      animationDuration: `${animationInfo.duration}s`,
      animationIterationCount: animationInfo.count === -1 ? 'infinite' : animationInfo.count,
      animationDelay: `${animationInfo.delay}s`,
      animationFillMode: 'both',
    };
    dispatch(update(animateInfo));
  };
  useEffect(() => {
    if (list.length < 0) return;
    setactiveIndex('' + (list.length - 1));
  }, [list]);
  return (
    <Collapse activeKey={activeIndex} bordered={false} onChange={panelChange} className="animate-list flex1" expandIconPosition="right" ghost accordion>
      {list.map((item, index) => (
        <>
          <Panel header={<AnimateHeader item={item} index={index} onClick={animatePlay} onDel={onDel}></AnimateHeader>} key={'' + index}>
            <Form
              size="small"
              onValuesChange={e => {
                onUpdate(e, index);
              }}
              initialValues={item.animationInfo}
            >
              <Form.Item label="动画时长" name="duration" initialValue={1}>
                <InputNumber step={0.1} min={0.1}></InputNumber>
              </Form.Item>
              <Form.Item label="动画延迟" name="delay">
                <InputNumber step={0.1} min={0}></InputNumber>
              </Form.Item>
              <Form.Item label="循环次数" name="count">
                <InputNumber min={-1}></InputNumber>
              </Form.Item>
            </Form>
          </Panel>
          <Divider />
        </>
      ))}
    </Collapse>
  );
};

export default AnimateList;
