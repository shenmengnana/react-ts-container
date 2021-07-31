import React, {FC, useEffect, useState} from 'react';
import './index.less';
import Text from './text';
import Img from './img';
import Fix from './fix';
import Absolute from './absolute';

const CompLibs = {
  Text,
  Img,
  Fix,
  Absolute,
};

export default CompLibs;
interface RenderObjTypes {
  [fcName: string]: FC;
}
export const RenderObj: RenderObjTypes = {
  text: CompLibs.Text,
  img: CompLibs.Img,
  fix: CompLibs.Fix,
  absolute: CompLibs.Absolute,
};

export const CompLibsTypes = [
  {
    type: 'text',
    typeName: '文本',
    icon: 'icon-wenben',
  },
  {
    type: 'img',
    typeName: '图片',
    icon: 'icon-tupian',
  },
  {
    type: 'fix',
    typeName: '挂件',
    icon: 'icon-zhuangshipin_huaban',
  },
  {
    type: 'absolute',
    typeName: '层叠',
    icon: 'icon-a-ziyuan122',
  },
];
