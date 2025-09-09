import { View, StatusBar, Platform } from 'react-native';
import { SafeAreaPaddingTopProps } from './common';

export function SafeAreaPaddingTop({ 
  children, 
  style, 
  backgroundColor = 'transparent' 
}: SafeAreaPaddingTopProps) {
  // 获取状态栏高度
  const statusBarHeight = Platform.select({
    ios: 44, // iOS 默认状态栏高度，在有刘海的设备上会自动调整
    android: StatusBar.currentHeight || 24, // Android 状态栏高度
    default: 0,
  });

  return (
    <View
      style={[
        {
          paddingTop: statusBarHeight,
          backgroundColor,
          width: '100%',
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

export default SafeAreaPaddingTop;
