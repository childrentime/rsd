import React, { useCallback, useEffect, useRef } from 'react';
import { css, html } from 'react-strict-dom';
import { FlatListProps } from './common';

const styles = css.create({
  container: {
    width: '100%',
  },
  guideElement: {
    height: '1px',
    width: '100%',
    pointerEvents: 'none',
  },
});

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
}: FlatListProps<T>) {
  console.log('FlatList web');
  const containerRef = useRef<HTMLDivElement>(null);
  const guideElementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 使用 IntersectionObserver 监听 guide 元素
  useEffect(() => {
    if (!onEndReached || !guideElementRef.current) return;

    // 创建 IntersectionObserver，使用 viewport 作为 root
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEndReached();
          }
        });
      },
      {
        rootMargin: `${onEndReachedThreshold * 100}%`,
        threshold: 0,
      }
    );

    // 开始观察 guide 元素
    observerRef.current.observe(guideElementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [onEndReached, onEndReachedThreshold, data]);

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
      ref={containerRef}
      style={[styles.container, style, contentContainerStyle]}
    >
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
      
      {/* Guide 元素用于触发无限滚动 */}
      {onEndReached && data && data.length > 0 && (
        <html.div
          ref={guideElementRef}
          style={styles.guideElement}
        />
      )}
    </html.div>
  );
}

export default FlatList;
