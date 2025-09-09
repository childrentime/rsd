import React from 'react';
import { FlatListProps } from "./common";

let FlatList: <T>(props: FlatListProps<T>) => React.ReactElement = null as any;

if (__PLATFORM__ === "h5") {
  FlatList = require('./index.web').default;
} else {
  FlatList = require('./index.native').default;
}

export default FlatList;
export type { FlatListProps } from './common';