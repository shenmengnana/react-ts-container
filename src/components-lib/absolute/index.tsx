import React, {FC, useEffect, useState} from 'react';
import {CompProps} from '@libs/index.d';
import compInitMap from '../const';

const Absolute: any = (defaultProps: CompProps) => {
  const props = {...compInitMap.fix, ...defaultProps};
  return (
    <div className="comp-item comp-absolute" style={props.style} {...props}>
      {props.value}
    </div>
  );
};
export default Absolute;
