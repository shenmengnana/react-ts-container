import React, {FC, useEffect, useState} from 'react';
import {CompProps} from '@libs/index.d';
import compInitMap from '../const';

const Text: any = (props: CompProps) => {
  return <p className="comp-item comp-text">{props.value}</p>;
};
export default Text;
