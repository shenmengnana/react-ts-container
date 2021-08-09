import React, {FC, useEffect, useState, useRef, useCallback, useMemo} from 'react';
import './index.less';
import {RenderObj} from '@libs/index';
import {CompTypes, CompProps} from '@libs/index.d';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useAppSelector, useAppDispatch} from '@/store';
import {setCompFixJson, setPageJson, setSelectIndex, setSelectIndexFix, setSelectObj} from '@/store/reducers/global';
import {Rnd, RndDragCallback, RndResizeCallback} from 'react-rnd';
import ElementActions from './components/element-actions';
const PreviewContent: FC = () => {
  const dispatch = useAppDispatch();
  const pageJson = useAppSelector(state => state.global['pageJson']);
  const compFixJson = useAppSelector(state => state.global['compFixJson']);
  const selectIndex = useAppSelector(state => state.global['selectIndex']);
  const selectIndexFix = useAppSelector(state => state.global['selectIndexFix']);
  const selectObj = useAppSelector(state => state.global['selectObj']);
  const pageStyle = useAppSelector(state => state.global['pageStyle']);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const inputRefs: Array<any> = useMemo(
    () =>
      Array(compFixJson.length)
        .fill(0)
        .map(i => React.createRef()),
    [compFixJson.length],
  );
  const CompRender = (item: CompProps, index: number) => {
    let CompName: any = RenderObj[item.type];
    return <CompName children {...item}></CompName>;
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    let index = result.destination.index;
    let newPageJson: Array<any> = reorder(pageJson, result.source.index, index);
    dispatch(setSelectIndex(index));
    dispatch(setPageJson(newPageJson));
  };
  // 更换位置
  const reorder = (list: Array<object>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const rndDragStop: RndDragCallback = (e, d) => {
    console.log('rndDragStop', d);
    let position = {x: d.x, y: d.y};
    dispatch(setSelectObj({...selectObj, position}));
    let list = JSON.parse(JSON.stringify(compFixJson));
    list[selectIndexFix] = {
      ...list[selectIndexFix],
      position,
    };
    dispatch(setCompFixJson(list));
  };
  const rndResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    console.log('rndResizeStop', ref.style, position);
    let style = {width: parseInt(ref.style.width), height: parseInt(ref.style.height)};
    dispatch(setSelectObj({...selectObj, style, position}));
    let list = JSON.parse(JSON.stringify(compFixJson));
    list[selectIndexFix] = {
      ...list[selectIndexFix],
      style,
      position,
    };
    dispatch(setCompFixJson(list));
  };
  useEffect(() => {
    if (pageJson.length === 0) return;
    dispatch(setSelectIndex(pageJson.length - 1));
    dispatch(setSelectIndexFix(-1));
    previewContentRef.current?.scrollBy({top: 100000, behavior: 'smooth'});
  }, [pageJson.length]);
  useEffect(() => {
    if (compFixJson.length === 0) return;
    dispatch(setSelectIndexFix(compFixJson.length - 1));
    dispatch(setSelectIndex(-1));
  }, [compFixJson.length]);
  return (
    <div className="preview-content" ref={previewContentRef}>
      <div className="element-actions-wrap">
        <ElementActions></ElementActions>
      </div>
      <div
        className="preview-content-cont"
        style={{
          backgroundColor: pageStyle.backgroundColor,
          backgroundImage: pageStyle.backgroundImage,
          backgroundSize: pageStyle.backgroundSize,
          backgroundRepeat: pageStyle.backgroundRepeat,
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" style={{backgroundColor: 'red'}}>
            {(provided: any, snapshot: any) => (
              <div ref={provided.innerRef} style={{backgroundColor: snapshot.isDraggingOver ? 'rgba(64,169,255,.4)' : ''}} {...provided.droppableProps}>
                {pageJson.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any, snapshot: any) => (
                      <div className="drag-wrap" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div
                          style={item.style}
                          className={`comp-wrap ${selectIndex === index ? 'comp-seleted' : ''}`}
                          onClick={() => {
                            dispatch(setSelectIndexFix(-1));
                            dispatch(setSelectIndex(index));
                          }}
                        >
                          {CompRender(item, index)}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {compFixJson.map((item, index) => (
          <Rnd
            ref={inputRefs[index]}
            id={item.id}
            style={{position: item.type === 'fix' ? 'fixed' : 'absolute'}}
            size={{width: item.style.width, height: item.style.height}}
            position={{...item.position}}
            // default={{...item.position, width: item.style.width, height: item.style.height}}
            key={item.id}
            bounds={item.type === 'fix' ? '.preview-content' : ''}
            className={`comp-fix ${selectIndexFix === index ? 'comp-fix-seleted' : ''}`}
            onMouseDown={() => {
              dispatch(setSelectIndex(-1));
              dispatch(setSelectIndexFix(index));
            }}
            onDragStop={rndDragStop}
            onResizeStop={rndResizeStop}
          ></Rnd>
        ))}
      </div>
    </div>
  );
};

export default PreviewContent;
