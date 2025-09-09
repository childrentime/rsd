import { css, html } from "react-strict-dom";
import { StickyHeaderProps } from './common';

const styles = css.create({
  header: (backgroundColor: string, zIndex: number) => ({
    backgroundColor,
    zIndex,
  }),
});

export function StickyHeader({ 
  children, 
  style, 
  backgroundColor = 'white',
  zIndex = 10
}: StickyHeaderProps) {
  return (
    <html.div style={[styles.header(backgroundColor, zIndex), style]}>
      {children}
    </html.div>
  );
}

export default StickyHeader;
