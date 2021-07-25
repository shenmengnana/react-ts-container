import React, {FC, useEffect, useState} from 'react';
import {Layout} from 'antd';
import './index.less';
import AttributeStyle from '../AttributeStyle';
const AttributeContent: FC = () => {
  return (
    <div className="attribute-content">
      <AttributeStyle></AttributeStyle>
    </div>
  );
};

export default AttributeContent;
