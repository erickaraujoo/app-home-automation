import { ToastAndroid } from 'react-native';

export const resolveCatchError = (error: unknown): void => {
  if (error instanceof TypeError)
    ToastAndroid.showWithGravity(
      'Falha na solicitação de rede',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  else
    ToastAndroid.showWithGravity(
      'Ocurreu um erro inesperado',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
};
