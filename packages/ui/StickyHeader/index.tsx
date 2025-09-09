import React from 'react';
import { StickyHeaderProps } from "./common";

let StickyHeader: (props: StickyHeaderProps) => React.ReactElement = null as any;

if (__PLATFORM__ === "h5") {
  StickyHeader = require('./index.web').default;
} else {
  StickyHeader = require('./index.native').default;
}

export default StickyHeader;
export type { StickyHeaderProps } from './common';
