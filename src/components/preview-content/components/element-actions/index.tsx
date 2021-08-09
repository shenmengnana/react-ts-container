import React, {useState, useEffect} from 'react';
import './index.less';
import {Tooltip} from 'antd';
import {CopyOutlined, DeleteOutlined, RiseOutlined, FallOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import {addPageJson, addPageOrCompJson} from '@/store/reducers/global';
import {useAppSelector, useAppDispatch} from '@/store';
import compInitMap, {compFixArr} from '@libs/const';
const actionsArr = [
  {action: 'copy', label: '复制', value: () => <CopyOutlined />},
  {action: 'del', label: '删除', value: () => <DeleteOutlined />},
  {action: 'up', label: '图层上移', value: () => <RiseOutlined />},
  {action: 'down', label: '图层下移', value: () => <FallOutlined />},
  {action: 'top', label: '图层置顶', value: () => <VerticalAlignTopOutlined />},
  {action: 'bottom', label: '图层置底', value: () => <VerticalAlignBottomOutlined />},
];

const ElementActions = () => {
  const dispatch = useAppDispatch();
  const {pageJson, compFixJson, selectObj} = useAppSelector(state => state.global);
  const handleAction = (type: string) => {
    switch (type) {
      case 'copy':
        return copyAction();
      case 'del':
        return delAction();
    }
  };
  const copyAction = () => {
    dispatch(addPageOrCompJson(selectObj));
  };
  const delAction = () => {
    console.log(2);
  };
  return (
    <div className="element-actions">
      {actionsArr.map((item, index) => (
        <Tooltip title={item.label} placement="right">
          <div
            key={item.action}
            className="action-item"
            onClick={() => {
              handleAction(item.action);
            }}
          >
            {item.value()}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ElementActions;
