import React, {FC, useEffect, useState,useRef} from 'react';
import {Layout} from 'antd';
import './index.less';
import {Rnd, RndResizeCallback} from 'react-rnd';
import { RenderObj  } from '@libs/index';
import { CompTypes, CompProps} from '@libs/index.d';
import {DraggableEventHandler} from 'react-draggable'
const CompRender = (item:CompProps)=>{
  let CompName = RenderObj[item.type]
  return <CompName children {...item}></CompName>
}

const PreviewContent: FC = () => {
  const [pageJson, setpageJson] = useState([
    {
      id: '图层1',
      type: 'text',
      value: '文本文案',
      position: {
        x: 0,
        y: 0,
      
      },
      style: {
        width: 200,
        height: 50,
        textAlign: 'center' as const,
        padding: 0,
        margin: 0,
      },
    },
    {
      id: '图层2',
      type: 'img',
      value: 'https://static-card.dushu365.com/miniPro/img/share_cut_index_v3.jpg',
      position: {
        x: 0,
        y: 90,
      },
      style: {
        width: 375,
        height: 'auto',
        textAlign: 'center' as const,
        padding: 0,
        margin: 0,
      },
    },
  ]);
  const pageJsonNew = useRef(pageJson)
  const currentIndex = useRef(0)
  const onDragStop: DraggableEventHandler = (e,d) =>{
    pageJsonNew.current[currentIndex.current].position.x = d.x
    pageJsonNew.current[currentIndex.current].position.y = d.y
  }
  const onResizeStop: RndResizeCallback = (e, direction, ref, delta, position) =>{
    pageJsonNew.current[currentIndex.current].style.width = ref.offsetWidth
    pageJsonNew.current[currentIndex.current].style.height =ref.offsetHeight
  }
  useEffect(() => {}, []);
  return (
    <div className="preview-content">
      <div className="main-content">
        {pageJson.map((item,index) => (
          <Rnd id={item.id} style={item.style} default={{...item.position, ...item.style}} key={item.id}  onDragStop={ (...e)=>{currentIndex.current = index;onDragStop(...e)}} onResizeStop={ (...e)=>{currentIndex.current = index; onResizeStop(...e)} }>
            {CompRender(item)}
          </Rnd>
        ))}
      </div>
      <div className="preview-content_mask"></div>
    </div>
  );
};

export default PreviewContent;
