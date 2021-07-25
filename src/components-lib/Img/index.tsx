import React, {FC, useEffect, useState} from 'react';
import {CompProps} from '@libs/index.d';
import compInitMap from '../const';

const Img: any = (defaultProps: CompProps) => {
  const props = {...compInitMap.img, ...defaultProps};
  // return <img src={props.value} className="comp-item comp-img" style={props.style} />;
  return <img src={props.value} className="comp-item comp-img" />;
};
export default Img;
