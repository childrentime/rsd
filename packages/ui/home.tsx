import { css, html } from "react-strict-dom";
import { useCallback, useState } from "react";
import FlatList from "./FlatList";
import SafeAreaPaddingTop from "./SafeAreaPaddingTop";
import LoadingDots from "./LoadingDots";
import StickyHeader from "./StickyHeader";

const styles = css.create({
  container: {
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  productList: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    cursor: 'pointer',
  },
  productContent: {
    display: 'flex',
    padding: 16,
    gap: 12,
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    fontSize: 12,
  },
  freshBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10b981',
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
  },
  dynamicOpacity: (opacity: number) => ({
    opacity,
  }),
  productInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6,
    color: 'white',
    whiteSpace: 'nowrap',
  },
  saleTag: {
    backgroundColor: '#ef4444',
  },
  groupTag: {
    backgroundColor: '#f97316',
  },
  lowPriceTag: {
    backgroundColor: '#8b5cf6',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    lineHeight: 1.4,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  progressSection: {
    marginTop: 'auto',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#fdcdcd',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: (percentage: number) => ({
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: '#be4646',
    borderRadius: 10,
    position: 'relative',
  }),
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  soldText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  priceLeft: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ef4444',
  },
  priceSymbol: {
    fontSize: 14,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 13,
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    fontSize: 11,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fbbf24',
  },
  loading: {
    textAlign: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    color: '#6b7280',
    fontSize: 14,
  },
  // 加载点容器样式
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  endMessage: {
    textAlign: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
});

const fruitImages = [
  'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop',
];



// 简单的图片组件
const ProductImage = ({ src, alt, style }: { src: string; alt: string; style: any }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <html.div style={styles.imageContainer}>
      <html.img
        src={src}
        alt={alt}
        style={[style, styles.dynamicOpacity(loaded ? 1 : 0)]}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {(!loaded || error) && (
        <html.div style={styles.imagePlaceholder}>
          {error ? '加载失败' : '加载中...'}
        </html.div>
      )}
      <html.div style={styles.freshBadge}>新鲜现摘</html.div>
    </html.div>
  );
};

const generateMockProduct = (id: number) => {
  const titles = [
    "正宗广西奶油白心芭乐 软心软糯新鲜番石榴 应季孕妇水果",
    "广西软糯奶油冰淇淋口感芭乐 白心芭乐番石榴新鲜包邮",
    "正宗广西奶油白心芭乐心 软软糯新鲜水果冰淇淋番石榴",
    "【新鲜精选】广西芭乐番石榴 白心芭乐心软新鲜应季水果",
    "广西软糯奶油冰淇淋口感芭乐 白心芭乐番石榴新鲜特价",
    "海南白心芭乐新鲜水果 软糯香甜番石榴当季现摘现发",
    "台湾珍珠芭乐新鲜水果 脆嫩多汁番石榴包邮到家",
    "精品白心芭乐5斤装 新鲜番石榴水果礼盒装包邮"
  ];

  const tagCombinations = [
    ["全网低价"],
    ["万人团", "全网低价"],
    ["限时抢购", "包邮"],
    ["店铺精品", "新鲜直达"],
    ["爆款热销", "限量特价"]
  ];

  const basePrice = 4.5 + Math.random() * 8;
  const originalPrice = basePrice + Math.random() * 15 + 5;
  const soldPercentage = Math.floor(Math.random() * 60) + 15;
  
  return {
    id,
    title: titles[id % titles.length],
    image: fruitImages[id % fruitImages.length],
    currentPrice: Number(basePrice.toFixed(1)),
    originalPrice: Number(originalPrice.toFixed(0)),
    soldPercentage,
    soldAmount: generateSoldAmount(),
    tags: tagCombinations[id % tagCombinations.length],
  };
};

const generateSoldAmount = () => {
  const rand = Math.random();
  if (rand < 0.3) return `${Math.floor(Math.random() * 50 + 10)}万+`;
  if (rand < 0.6) return `${Math.floor(Math.random() * 9000 + 1000)}斤`;
  return `${(Math.random() * 8 + 1).toFixed(1)}万+斤`;
};

export function MyComponent() {
  const [products, setProducts] = useState(() => 
    Array.from({ length: 8 }, (_, i) => generateMockProduct(i))
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newProducts = Array.from({ length: 6 }, (_, i) => 
      generateMockProduct(products.length + i)
    );
    
    setProducts(prev => [...prev, ...newProducts]);
    setLoading(false);
    
    // 模拟数据用完
    if (products.length > 40) {
      setHasMore(false);
    }
  }, [products.length, loading, hasMore]);

  // 渲染单个产品项
  const renderItem = useCallback(({ item: product }: { item: any }) => {
    const discount = Math.round((1 - product.currentPrice / product.originalPrice) * 100);
    
    return (
      <html.div style={styles.productCard}>
        <html.div style={styles.productContent}>
          <ProductImage 
            src={product.image}
            alt={product.title}
            style={styles.productImage}
          />
          
          <html.div style={styles.productInfo}>
            <html.div style={styles.tagContainer}>
              {product.tags.map((tag: string, index: number) => (
                <html.span 
                  key={index}
                  style={[
                    styles.tag,
                    tag === "万人团" ? styles.groupTag :
                    tag === "全网低价" ? styles.lowPriceTag : styles.saleTag
                  ]}
                >
                  {tag}
                </html.span>
              ))}
            </html.div>
            
            <html.div style={styles.productTitle}>
              <html.span>{product.title}</html.span>
            </html.div>
            
            <html.div style={styles.progressSection}>
              <html.div style={styles.progressContainer}>
                <html.div style={styles.progressBar}>
                  <html.div style={styles.progressFill(product.soldPercentage)}/>
                  <html.div style={styles.progressText}>
                    <html.span>已抢{product.soldPercentage}%</html.span>
                  </html.div>
                </html.div>
                <html.span style={styles.soldText}>
                  <html.span>已抢{product.soldAmount}</html.span>
                </html.span>
              </html.div>
              
              <html.div style={styles.priceContainer}>
                <html.div style={styles.priceLeft}>
                  <html.span style={styles.currentPrice}>
                    <html.span style={styles.priceSymbol}>秒杀价 ¥</html.span>
                    {product.currentPrice}
                  </html.span>
                  <html.span style={styles.originalPrice}>
                    ¥{product.originalPrice}
                  </html.span>
                </html.div>
                <html.span style={styles.discountBadge}>
                  <html.span>省{discount}%</html.span>
                </html.span>
              </html.div>
            </html.div>
          </html.div>
        </html.div>
      </html.div>
    );
  }, []);

  // 渲染底部组件
  const renderFooter = useCallback(() => {
    if (loading) {
      return (
        <html.div style={styles.loading}>
          <html.div style={styles.loadingContainer}>
            <LoadingDots size={8} color="#ef4444" />
            <html.span>正在加载更多商品...</html.span>
          </html.div>
        </html.div>
      );
    }
    
    if (!hasMore) {
      return (
        <html.div style={styles.endMessage}>
          <html.span>🎉 所有商品已加载完成</html.span>
        </html.div>
      );
    }
    
    return null;
  }, [loading, hasMore]);

  return (
    <html.div style={styles.container}>
      <SafeAreaPaddingTop/>
      <StickyHeader style={styles.header}>
        你可能想要找
      </StickyHeader>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      />
    </html.div>
  );
}