import { css, html } from "react-strict-dom";
import { LoadingDotsProps } from './common';

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: (size: number, color: string) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: 0.3,
  }),
});

export function LoadingDots({ 
  size = 8, 
  color = '#ef4444', 
  style 
}: LoadingDotsProps = {}) {
  return (
    <html.div style={[styles.container, style]}>
      <html.div style={styles.dot(size, color)} />
      <html.div style={styles.dot(size, color)} />
      <html.div style={styles.dot(size, color)} />
    </html.div>
  );
}

export default LoadingDots;
export type { LoadingDotsProps } from './common';
