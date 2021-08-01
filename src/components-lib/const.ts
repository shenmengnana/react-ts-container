import {CompProps} from '@libs/index.d';
interface ObjAnyType {
  [key: string]: any;
}
const compInitMap: ObjAnyType = {
  text: {
    type: 'text',
    value: '文本文案',
    style: {
      width: '100%',
      height: 50,
      textAlign: 'center',
    },
    position: {x: 0, y: 0},
    animateList: [],
  },
  img: {
    type: 'img',
    value: 'https://static-card.dushu365.com/miniPro/img/share_cut_index_v3.jpg',
    style: {
      width: '100%',
      height: 'auto',
    },
    position: {x: 0, y: 0},
    animateList: [],
  },
  fix: {
    type: 'fix',
    value: '挂件',
    position: {x: 0, y: 0},
    style: {
      width: 100,
      height: 100,
    },
    animateList: [],
  },
  absolute: {
    type: 'absolute',

    value: '层叠',
    position: {x: 0, y: 0},
    style: {
      width: 150,
      height: 150,
    },
    animateList: [],
  },
};

export default compInitMap;

export const compFixArr = ['fix', 'absolute'];
