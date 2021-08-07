export interface ObjectAny {
  [key: string]: any;
}
export interface AnimateChilrenType {
  label: string;
  value: string;
}
export interface AnimateListType extends AnimateChilrenType {
  duration: number;
  count: number;
  delay: number;
}

export interface PageJsonState {
  id: string;
  type: string;
  value: string | any;
  position: {
    x: number;
    y: number;
  };
  style: {
    width: number;
    height: number;
    [key: string]: any;
  };
  animateList: Array<AnimateListType>;
}
export interface RndUpdateType {
  type: string;
  value: object;
}
export interface SelectObjType extends PageJsonState {
  compType: string; // static  fix
  index: number;
}

export interface PageStyleType extends ObjectAny {
  backgroundColor?: string;
}
