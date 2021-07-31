import React, {useState, useEffect} from 'react';
import animateCssData from '@/utils/animateCssData';
import {Tabs} from 'antd';
const {TabPane} = Tabs;
const AnimateOption = () => {
  const [tabIndex, settabIndex] = useState('0');
  const [hoverIndex, sethoverIndex] = useState(-1);
  const tabChange = (e: string) => {
    settabIndex(e);
  };
  const onMouseEnter = (e: React.MouseEvent, index: number) => {
    console.log('enter', e, index);
    sethoverIndex(index);
  };
  const onMouseLeave = (e: React.MouseEvent, index: number) => {
    console.log('leave', e, index);
    sethoverIndex(-1);
  };
  return (
    <div className="animate-option">
      <Tabs defaultActiveKey={tabIndex} onChange={tabChange}>
        {animateCssData.map((list, index) => (
          <TabPane tab={list.label} key={index} className="flex flex-wrap">
            {list.children.map((item, index) => (
              <div
                className="list-item"
                onMouseEnter={e => {
                  onMouseEnter(e, index);
                }}
                onMouseLeave={e => {
                  onMouseLeave(e, index);
                }}
              >
                <div className={`list-item_box ${hoverIndex === index ? `animate__${item.value} animate__animated` : ''}`}></div>
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
