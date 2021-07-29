import React, {FC, useEffect, useState} from 'react';
import {Button, Space, Collapse} from 'antd';
import './index.less';
import AnimationOption from './animate-option';
const {Panel} = Collapse;

const Animation: FC = () => {
  const panelChange = () => {};
  return (
    <div className="animation">
      <Space size={20}>
        <Button type="primary">+添加动画</Button>
        <Button>预览动画</Button>
      </Space>
      <Collapse defaultActiveKey={['1']} bordered={false} onChange={panelChange} className="collapse-cont">
        <Panel header="This is panel header 1" key="1">
          <p>111</p>
        </Panel>
      </Collapse>
      <AnimationOption></AnimationOption>
    </div>
  );
};

export default Animation;
