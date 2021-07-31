import React, {FC, useEffect, useState} from 'react';
import {Button, Space, Divider, Drawer} from 'antd';
import {useBoolean} from 'ahooks';
import './index.less';
import AnimationOption from './animate-option/index';
import AnimateList from './animate-list';
import {AddAnimateListProps, AnimateChilrenType} from './index.d';
const initAnimationInfo = {
  duration: 1,
  count: 1,
  delay: 0,
};
const Animation: FC = () => {
  const [animateList, setanimateList] = useState([] as Array<AddAnimateListProps>);
  const [visibleAnimate, setvisibleAnimate] = useBoolean();

  const addAniamte = (item: AnimateChilrenType) => {
    let list = [...animateList];
    list.push({
      ...item,
      animationInfo: {...initAnimationInfo},
    });
    setanimateList(list);
    setvisibleAnimate.setFalse();
  };
  const updateAnimate = (info: any, i: number) => {
    let list = [...animateList];
    list[i].animationInfo = {
      ...list[i].animationInfo,
      ...info,
    };
    setanimateList(list);
  };
  const delAnimate = (i: number) => {
    let list = [...animateList];
    list.splice(i, 1);
    setanimateList(list);
  };
  return (
    <div className="animation flex-column">
      <Space size={20}>
        <Button type="primary" onClick={setvisibleAnimate.setTrue}>
          +添加动画
        </Button>
        <Button>预览动画</Button>
      </Space>
      <Divider></Divider>
      <AnimateList list={animateList} onDel={delAnimate} onUpdate={updateAnimate}></AnimateList>
      <Drawer placement="right" visible={visibleAnimate} onClose={setvisibleAnimate.setFalse} closable={false} width={400}>
        <AnimationOption add={addAniamte}></AnimationOption>
      </Drawer>
    </div>
  );
};

export default Animation;
