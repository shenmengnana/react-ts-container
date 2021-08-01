import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../index';
const positionKeyArr = ['x', 'y'];

export interface objectAny {
  [key: string]: any;
}
export interface PageJsonState {
  id: string;
  type: string;
  value: string;
  position: {
    x: number;
    y: number;
  };
  style: {
    width: number;
    height: number;
    [key: string]: any;
  };
}
export interface RndUpdateType {
  type: string;
  value: object;
}
export interface SelectObjType {
  compType: string; // static  fix
  index: number;
  id: string;
  type: string;
  value: string;
  position: {
    x: number;
    y: number;
  };
  style: {
    width: number;
    height: number;
    [key: string]: any;
  };
}
interface initStateType {
  selectIndex: number;
  pageJson: Array<PageJsonState>;
  selectIndexFix: number;
  compFixJson: Array<PageJsonState>;
  selectObj: SelectObjType;
}

const initialState: initStateType = {
  selectIndex: -1,
  selectIndexFix: -1,
  pageJson: [],
  compFixJson: [],
  selectObj: {
    id: '0',
    value: '',
    compType: '',
    type: '',
    index: -1,
    style: {
      width: 0,
      height: 0,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
};

export const pageJosnSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSelectIndexFn: (state, action: PayloadAction<number>) => {
      state.selectIndex = action.payload;
    },
    setSelectIndexFixFn: (state, action: PayloadAction<number>) => {
      state.selectIndexFix = action.payload;
    },
    setPageJson: (state, action: PayloadAction<Array<PageJsonState>>) => {
      state.pageJson = action.payload;
    },
    addPageJson: (state, action: PayloadAction<PageJsonState>) => {
      state.pageJson.push(action.payload);
    },
    delPageJson: (state, action: PayloadAction<number>) => {
      state.pageJson.splice(action.payload, 1);
    },
    setCompFixJson: (state, action: PayloadAction<Array<PageJsonState>>) => {
      state.compFixJson = action.payload;
    },
    addCompFixJson: (state, action: PayloadAction<PageJsonState>) => {
      state.compFixJson.push(action.payload);
    },
    delCompFixJson: (state, action: PayloadAction<number>) => {
      state.compFixJson.splice(action.payload, 1);
    },
    setSelectObj: (state, action: PayloadAction<SelectObjType>) => {
      state.selectObj = action.payload;
    },
  },
});

export const {setPageJson, addPageJson, setCompFixJson, setSelectIndexFn, setSelectIndexFixFn, addCompFixJson, setSelectObj} = pageJosnSlice.actions;

export const setSelectIndex =
  (index: number): AppThunk =>
  (dispatch, getState) => {
    if (index < 0) {
      dispatch(setSelectIndexFn(index));
      return;
    }
    const {pageJson, selectObj} = getState().global;

    let current: PageJsonState = pageJson[index];
    dispatch(setSelectIndexFn(index));
    (index !== selectObj.index || selectObj.compType !== 'static') && dispatch(setSelectObj({compType: 'static', index, ...current}));
  };

export const setSelectIndexFix =
  (index: number): AppThunk =>
  (dispatch, getState) => {
    if (index < 0) {
      dispatch(setSelectIndexFixFn(index));
      return;
    }
    const {compFixJson, selectObj} = getState().global;
    let current: PageJsonState = compFixJson[index];
    dispatch(setSelectIndexFixFn(index));
    (index !== selectObj.index || selectObj.compType !== 'fix') && dispatch(setSelectObj({compType: 'fix', index, ...current}));
  };

export const update =
  (info: objectAny): AppThunk =>
  (dispatch, getState) => {
    console.log('update', info);
    let key = Object.keys(info)[0];
    let updateType = positionKeyArr.includes(key) ? 'position' : 'style';
    const {selectObj, compFixJson, pageJson} = getState().global;
    if (selectObj.compType === 'fix') {
      let list = JSON.parse(JSON.stringify(compFixJson));
      let current = list[selectObj.index];
      let style = current.style;
      let position = current.position;
      if (updateType === 'style') {
        style = {
          ...style,
          ...info,
        };
      } else if (updateType === 'position') {
        position = {
          ...position,
          ...info,
        };
      } else {
        current = {
          ...current,
          ...info,
        };
      }
      current = {
        ...current,
        style,
        position,
      };
      list[selectObj.index] = current;
      dispatch(setCompFixJson(list));
    } else {
      let list = JSON.parse(JSON.stringify(pageJson));
      let current = list[selectObj.index];
      let style = current.style;
      if (updateType === 'style') {
        style = {
          ...style,
          ...info,
        };
      } else if (updateType === 'position') {
        info.x && (style.marginLeft = info.x);
        info.y && (style.marginTop = info.y);
      } else {
        current = {
          ...current,
          ...info,
        };
      }
      current.style = style;
      list[selectObj.index] = current;
      dispatch(setPageJson(list));
    }
  };

export default pageJosnSlice.reducer;
