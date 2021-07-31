import React, {FC, useEffect, useState} from 'react';
import {Button, Space, Collapse, Form, InputNumber, Divider} from 'antd';
import './index.less';
import {animateCssChilrenType} from '@/utils/animateCssData';
import {CaretRightOutlined, DeleteOutlined} from '@ant-design/icons';
const {Panel} = Collapse;
interface AnimateListProps {
  list: Array<animateCssChilrenType>;
}
interface HeaderProps {
  index: number;
  item: animateCssChilrenType;
  onClick: (i: number) => void;
}
const AnimateHeader = ({index, item, onClick}: HeaderProps) => {
  return (
    <div className="animate-list-header flex-start-center">
      <div className="header-title">动画{index + 1}</div>
      <div className="header-label">{item.label}</div>
      <Button
        className="header-play"
        icon={<CaretRightOutlined />}
        type="primary"
        size="small"
        onClick={() => {
          onClick(index);
        }}
      ></Button>
      <Button className="header-del" icon={<DeleteOutlined />} danger size="small"></Button>
    </div>
  );
};
const AnimateList = ({list}: AnimateListProps) => {
  const panelChange = () => {};
  const animatePlay = (index: number) => {
    console.log('animatePlay', index);
  };
  const formChange = (e: any) => {
    console.log('formChange', e);
  };
  return (
    <Collapse defaultActiveKey={['1']} bordered={false} onChange={panelChange} className="animate-list" expandIconPosition="right" ghost>
      {list.map((item, index) => (
        <>
          <Panel header={<AnimateHeader item={item} index={index} onClick={animatePlay}></AnimateHeader>} key="1">
            <Form size="small" onValuesChange={formChange} initialValues={{duration: 1, count: 1}}>
              <Form.Item label="动画时长" name="duration" initialValue={1}>
                <InputNumber step={0.1} min={0.1}></InputNumber>
              </Form.Item>
              <Form.Item label="动画延迟" name="delay">
                <InputNumber step={0.1} min={0}></InputNumber>
              </Form.Item>
              <Form.Item label="循环次数" name="count">
                <InputNumber min={0}></InputNumber>
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
