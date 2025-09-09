import { html } from 'react-strict-dom';
import { SafeAreaPaddingTopProps } from './common';

export function SafeAreaPaddingTop({ 
  children, 
  style, 
  backgroundColor = 'transparent' 
}: SafeAreaPaddingTopProps) {
  // Web 版本不需要处理状态栏，直接返回children或null
  if (children) {
    return <>{children}</>;
  }
  return null;
}

export default SafeAreaPaddingTop;
