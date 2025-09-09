import { css, html } from "react-strict-dom";
import { StickyHeaderProps } from './common';

const styles = css.create({
  sticky: (backgroundColor: string, zIndex: number) => ({
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor,
    zIndex,
  }),
});

export function StickyHeader({ 
  children, 
  backgroundColor = 'white',
  zIndex = 1000,
  style, 
}: StickyHeaderProps) {
  return (
    <html.div style={[
      styles.sticky(backgroundColor, zIndex), 
      style
    ]}>
      {children}
    </html.div>
  );
}

export default StickyHeader;
