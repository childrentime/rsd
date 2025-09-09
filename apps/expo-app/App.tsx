import { MyComponent } from 'ui';

export default function App() {
  // Test __PLATFORM__ variable injection
  console.log('__PLATFORM__ is:', __PLATFORM__);
  console.log('__DEV__ is:', __DEV__);
  
  return (
    <MyComponent/>
  );
}

