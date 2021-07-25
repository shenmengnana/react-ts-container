import React, {FC, useEffect, useState} from 'react';
import {Layout} from 'antd';
import './index.less';
import 'normalize.css';
import CusHeader from '@/components/CusHeader';
import ComponentsLib from '@/components/CompLibs';
import PreviewContent from '@/components/PreviewContent';
import AttributeContent from '@/components/AttributeContent';
const {Header, Sider, Content} = Layout;

const Index: FC = () => {
  return (
    <Layout className="flex-column index">
      <Header>
        <CusHeader></CusHeader>
      </Header>
      <Content className="flex1">
        <Layout style={{height: '100%'}}>
          <Sider width={300}>
            <ComponentsLib></ComponentsLib>
          </Sider>
          <Content>
            <PreviewContent></PreviewContent>
          </Content>
          <Sider width={300}>
            <AttributeContent></AttributeContent>
          </Sider>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Index;
