import React, {FC, useEffect, useState} from 'react';
import {CompProps} from '@libs/index.d';
import compInitMap from '../const';

const Img: any = (props: CompProps) => {
  return <img src={props.value} className="comp-item comp-img" />;
};
export default Img;
