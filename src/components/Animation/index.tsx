import React, {FC, useEffect, useState} from 'react';
import {Button, Space, Divider} from 'antd';
import './index.less';
import AnimationOption from './animate-option';
import AnimateList from './animate-list';

const Animation: FC = () => {
  const [animateList, setanimateList] = useState([{label: '向左进入', value: 'fadeInLeft'}]);
  return (
    <div className="animation">
      <Space size={20}>
        <Button type="primary">+添加动画</Button>
        <Button>预览动画</Button>
      </Space>
      <Divider></Divider>
      <AnimateList list={animateList}></AnimateList>

      <AnimationOption></AnimationOption>
    </div>
  );
};

export default Animation;
