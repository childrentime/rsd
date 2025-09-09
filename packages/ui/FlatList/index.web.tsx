import React, { useCallback, useEffect, useRef } from 'react';
import { html } from 'react-strict-dom';

// Web 版本的 FlatList props 定义
export interface FlatListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  contentContainerStyle?: any;
  style?: any;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  onEndReachedThreshold = 0.1,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  contentContainerStyle,
  style,
  refreshing: _refreshing, // unused for now
  onRefresh: _onRefresh, // unused for now
}: FlatListProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 处理滚动到底部的逻辑
  const handleScroll = useCallback((e: Event) => {
    if (!onEndReached) return;
    
    const target = e.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const threshold = scrollHeight * onEndReachedThreshold;
    
    if (scrollHeight - scrollTop - clientHeight <= threshold) {
      onEndReached();
    }
  }, [onEndReached, onEndReachedThreshold]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const defaultKeyExtractor = useCallback((item: T, index: number) => {
    return keyExtractor ? keyExtractor(item, index) : index.toString();
  }, [keyExtractor]);

  // 渲染列表项
  const renderItems = () => {
    if (!data || data.length === 0) {
      return ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? 
          ListEmptyComponent : 
          React.createElement(ListEmptyComponent)
      ) : null;
    }

    return data.map((item, index) => (
      <html.div key={defaultKeyExtractor(item, index)}>
        {renderItem({ item, index })}
      </html.div>
    ));
  };

  return (
    <html.div
      ref={scrollRef}
      style={[
        {
          overflow: 'auto',
          height: '100%',
          width: '100%',
        },
        style
      ]}
    >
      <html.div style={contentContainerStyle}>
        {ListHeaderComponent && (
          React.isValidElement(ListHeaderComponent) ? 
            ListHeaderComponent : 
            React.createElement(ListHeaderComponent)
        )}
        
        {renderItems()}
        
        {ListFooterComponent && (
          React.isValidElement(ListFooterComponent) ? 
            ListFooterComponent : 
            React.createElement(ListFooterComponent)
        )}
      </html.div>
    </html.div>
  );
}

export default FlatList;
