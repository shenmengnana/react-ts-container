import React, {FC, useEffect, useState} from 'react';
import {Tabs} from 'antd';
import './index.less';
import AttributeStyle from '../attribute-style';
import Animation from '../animation';
import PageSet from '../page-set';
const {TabPane} = Tabs;
const AttributeContent: FC = () => {
  const tabChange = () => {};
  return (
    <div className="attribute-content">
      <Tabs defaultActiveKey="2" onChange={tabChange}>
        <TabPane tab="属性" key="1">
          <AttributeStyle></AttributeStyle>
        </TabPane>
        <TabPane tab="动画" key="2">
          <Animation></Animation>
        </TabPane>
        <TabPane tab="页面设置" key="3">
          <PageSet></PageSet>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AttributeContent;
