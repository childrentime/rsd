
import React from 'react';
import { SafeAreaPaddingTopProps } from './common';

let SafeAreaPaddingTop: React.ComponentType<SafeAreaPaddingTopProps> = null as any;

if (__PLATFORM__ === "h5") {
  SafeAreaPaddingTop = require('./index.web').default;
} else {
  SafeAreaPaddingTop = require('./index.native').default;
}

export default SafeAreaPaddingTop;
export type { SafeAreaPaddingTopProps } from './common';
