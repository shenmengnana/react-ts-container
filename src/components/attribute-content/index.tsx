import React, {FC, useEffect, useState} from 'react';
import {Tabs} from 'antd';
import './index.less';
import AttributeStyle from '../attribute-style';
import Animation from '../animation';
import PageSet from '../page-set';
import {useAppSelector} from '@/store';
const {TabPane} = Tabs;
const AttributeContent: FC = () => {
  const {selectObj} = useAppSelector(state => state.global);
  const tabChange = () => {};
  return (
    <Tabs defaultActiveKey="1" onChange={tabChange} className="attribute-content">
      <TabPane tab="属性" key="1">
        {selectObj.index > -1 ? <AttributeStyle></AttributeStyle> : <p className="tip">请选择需要编辑的元素</p>}
      </TabPane>
      <TabPane tab="动画" key="2">
        {selectObj.index > -1 ? <Animation></Animation> : <p className="tip">请选择需要编辑的元素</p>}
      </TabPane>
      <TabPane tab="页面设置" key="3">
        <PageSet></PageSet>
      </TabPane>
    </Tabs>
  );
};

export default AttributeContent;
