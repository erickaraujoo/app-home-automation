import { AuthScreen } from 'pages/auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from 'pages/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type { StackParamList } from 'models/arduino/native-stack/stack-param-list.model';

const Stack = createNativeStackNavigator<StackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#151519',
    border: 'transparent',
    card: '#1D1D20',
    notification: '#1D1D20',
    primary: '#151519',
    text: '#F3F3F3'
  }
};

const App: FC = () => (
  <NavigationContainer theme={MyTheme}>
    <Stack.Navigator initialRouteName={'Auth'}>
      <Stack.Screen
        component={AuthScreen}
        name={'Auth'}
        options={{ headerBackVisible: false, headerTitle: 'Autenticação' }}
      />

      <Stack.Screen
        component={HomeScreen}
        name={'Home'}
        options={{ headerBackVisible: false, headerTitle: 'Página Inicial' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
