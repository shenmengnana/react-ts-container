import React, {FC, useEffect, useState} from 'react';
import {Layout} from 'antd';
import './index.less';
import CompLibs, {CompLibsTypes} from '@libs/index';
import {addPageJson, addCompFixJson} from '@/store/reducers/global';
import {useAppSelector, useAppDispatch} from '@/store';
import compInitMap, {compFixArr} from '@libs/const';
const ComponentsLib: FC = () => {
  const dispatch = useAppDispatch();
  const pageJson = useAppSelector(state => state.global['pageJson']);
  const compFixJson = useAppSelector(state => state.global['compFixJson']);
  const addComp = (type: string) => {
    if (compFixArr.includes(type)) {
      let obj = {
        id: `compFix${compFixJson.length + 2}`,
        ...compInitMap[type],
      };
      dispatch(addCompFixJson(obj));
      return;
    }
    let obj = {
      id: `comp${pageJson.length + 2}`,
      ...compInitMap[type],
    };
    dispatch(addPageJson(obj));
  };
  return (
    <div className="components-lib-wrap">
      <h1 className="title">组件库</h1>
      <p className="sub-title">基础组件</p>
      <div className="comp-list flex flex-wrap">
        {CompLibsTypes.map(item => (
          <div
            className="list-item flex-column flex-center-center"
            onClick={() => {
              addComp(item.type);
            }}
            key={item.type}
          >
            <p className={`iconfont ${item.icon}`}></p>
            <p>{item.typeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsLib;
