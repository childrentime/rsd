import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
import { FlatListProps } from './common';

export function FlatList<T>(props: FlatListProps<T>) {
  // 将我们的 props 转换为 React Native FlatList 的 props
  // 不使用内置的 sticky 功能，让 StickyHeader 组件自己处理
  return <RNFlatList<T> 
    {...(props as RNFlatListProps<T>)} 
  />;
}

export default FlatList;
