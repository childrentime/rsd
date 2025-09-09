import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';

// React Native 版本直接使用原生 FlatList
export interface FlatListProps<T> extends RNFlatListProps<T> {
  // 可以在这里添加自定义的 props 如果需要的话
}

export function FlatList<T>(props: FlatListProps<T>) {
  return <RNFlatList {...props} />;
}

export default FlatList;
