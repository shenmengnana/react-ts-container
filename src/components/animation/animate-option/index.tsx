import React, {useState, useEffect} from 'react';
import animateCssData, {AnimateCssChilrenType} from '@/utils/animateCssData';
import {Tabs} from 'antd';
import './index.less';
interface AnimateOptionProps {
  add: (key: AnimateCssChilrenType) => void;
}
const {TabPane} = Tabs;
const AnimateOption = ({add}: AnimateOptionProps) => {
  const [tabIndex, settabIndex] = useState('0');
  const [hoverIndex, sethoverIndex] = useState(-1);
  const tabChange = (e: string) => {
    settabIndex(e);
  };
  const onMouseEnter = (index: number) => {
    sethoverIndex(index);
  };
  const onMouseLeave = () => {
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
                onMouseEnter={() => {
                  onMouseEnter(index);
                }}
                onMouseLeave={onMouseLeave}
                onClick={() => {
                  add(item);
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
