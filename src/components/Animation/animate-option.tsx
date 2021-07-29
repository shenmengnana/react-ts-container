import React, {useState, useEffect} from 'react';
import animateCssData from '@/utils/animateCssData';
import {Tabs} from 'antd';
const {TabPane} = Tabs;
const AnimateOption = () => {
  const tabChange = () => {};
  const onMouseEnter = (e: React.MouseEvent) => {
    console.log(1111, e);
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    console.log('leave', e);
  };
  return (
    <div className="animate-option">
      <Tabs defaultActiveKey="0" onChange={tabChange}>
        {animateCssData.map((list, index) => (
          <TabPane tab={list.label} key={index} className="flex flex-wrap">
            {list.children.map(item => (
              <div className="list-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div className="list-item_box"></div>
                <div className="list-item_title">{item.label}</div>
              </div>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default AnimateOption;
