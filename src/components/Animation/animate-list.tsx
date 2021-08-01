import React, {FC, useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {Button, Space, Collapse, Form, InputNumber, Divider} from 'antd';
import './index.less';
import {CaretRightOutlined, DeleteOutlined} from '@ant-design/icons';
import {useAppSelector, useAppDispatch} from '@/store';
import {update} from '@/store/reducers/global';
import {AnimateListType, AnimateChilrenType} from '@/store/reducers/index.d';
import {sleep} from '@/utils';
const {Panel} = Collapse;

interface AnimateListProps {
  list: Array<AnimateListType>;
  onUpdate: (e: any, i: number) => void;
  onDel: HeaderProps['onDel'];
}
interface HeaderProps {
  index: number;
  item: AnimateChilrenType;
  onClick: (i: number) => void;
  onDel: (i: number) => void;
}

const AnimateHeader = ({index, item, onClick, onDel}: HeaderProps) => {
  return (
    <div className="animate-list-header flex-start-center">
      <div className="header-title">动画{index + 1}</div>
      <div className="header-label">{item.label}</div>
      <Button
        className="header-play"
        icon={<CaretRightOutlined />}
        type="primary"
        size="small"
        onClick={e => {
          e.stopPropagation();
          onClick(index);
        }}
      ></Button>
      <Button
        className="header-del"
        icon={<DeleteOutlined />}
        danger
        size="small"
        onClick={e => {
          e.stopPropagation();
          onDel(index);
        }}
      ></Button>
    </div>
  );
};
const AnimateList = forwardRef<HTMLDivElement, AnimateListProps>((props, ref) => {
  const {list, onDel, onUpdate} = props as AnimateListProps;
  const [activeIndex, setactiveIndex] = useState([] as string | string[]);
  const isAnimating = useRef(false);
  const isAllAnimating = useRef(false);
  const allAnimateCount = useRef(0);
  const dispatch = useAppDispatch();
  const panelChange = (key: string | string[]) => {
    setactiveIndex(key);
  };
  const animatePlay = async (index: number) => {
    const {duration, count, delay, value} = list[index];
    if (duration <= 0 || count === 0 || isAnimating.current) return Promise.resolve();
    isAnimating.current = true;
    let animateInfo = {
      animationName: value,
      animationDuration: `${duration}s`,
      animationIterationCount: count === -1 ? 'infinite' : count,
      animationDelay: `${delay}s`,
      animationFillMode: 'both',
    };
    dispatch(update(animateInfo));
    if (count === -1) {
      isAnimating.current = false;
      return Promise.resolve();
    }
    await sleep((duration + delay) * 1000);
    dispatch(
      update({
        animationName: '',
      }),
    );
    isAnimating.current = false;
    return Promise.resolve();
  };
  const runAllAnimate = async () => {
    if (allAnimateCount.current >= list.length) {
      isAllAnimating.current = false;
      allAnimateCount.current = 0;
      return;
    }

    await animatePlay(allAnimateCount.current);
    allAnimateCount.current += 1;
    runAllAnimate();
  };
  useEffect(() => {
    if (list.length === 0) return;
    setactiveIndex('' + (list.length - 1));
    animatePlay(list.length - 1);
  }, [list.length]);
  useImperativeHandle<HTMLDivElement, any>(ref, () => ({
    runAllAnimate() {
      if (isAllAnimating.current) return;
      isAllAnimating.current = true;
      runAllAnimate();
    },
  }));
  return (
    <div ref={ref}>
      <Collapse activeKey={activeIndex} bordered={false} onChange={panelChange} className="animate-list flex1" expandIconPosition="right" ghost accordion>
        {list.map((item, index) => (
          <>
            <Panel header={<AnimateHeader item={item} index={index} onClick={animatePlay} onDel={onDel}></AnimateHeader>} key={'' + index}>
              <Form
                size="small"
                onValuesChange={e => {
                  onUpdate(e, index);
                }}
                initialValues={item}
              >
                <Form.Item label="动画时长" name="duration" initialValue={1}>
                  <InputNumber step={0.1} min={0.1}></InputNumber>
                </Form.Item>
                <Form.Item label="动画延迟" name="delay">
                  <InputNumber step={0.1} min={0}></InputNumber>
                </Form.Item>
                <Form.Item label="动画次数">
                  <Form.Item name="count" noStyle>
                    <InputNumber min={-1}></InputNumber>
                  </Form.Item>
                  <span> -1 为循环播放</span>
                </Form.Item>
              </Form>
            </Panel>
            <Divider />
          </>
        ))}
      </Collapse>
    </div>
  );
});

export default AnimateList;
