import type { InterfaceToType } from 'models/helpers/interface-to-type.model';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Stack } from './native-stack.model';

export type StackParamList = InterfaceToType<Stack>;

export type StackNavigation = NativeStackNavigationProp<StackParamList>;
