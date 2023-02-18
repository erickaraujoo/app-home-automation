import { SafeAreaView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { asyncStorageKeys } from 'config/constants';
import { authSchema } from 'utils/validators/schemas/arduino.schema';
import { ping } from 'services/fetch/fetch.infra';
import { resolveCatchError } from 'utils/errors/resolve-catch-error.util';
import { styles } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthFormModel } from 'models/form/auth.form.model';
import type { AuthScreenProps } from 'models/props/auth.props.model';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

export const AuthScreen: FC<AuthScreenProps> = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<AuthFormModel>({
    mode: 'onBlur',
    resolver: yupResolver(authSchema)
  });

  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  const checkAsyncStorageIp = useCallback(async (): Promise<void> => {
    const ip = await AsyncStorage.getItem(asyncStorageKeys.ip);

    if (ip === null) return;

    await AsyncStorage.removeItem(asyncStorageKeys.ip);
    await AsyncStorage.removeItem('@data');

    setLoadingScreen(true);

    try {
      const data = await ping({ ip });

      await AsyncStorage.setItem(asyncStorageKeys.ip, ip);
      await AsyncStorage.setItem('@data', JSON.stringify(data));

      navigation.push('Home');
    } catch (error) {
      if (error instanceof Error && error.message === 'Aborted')
        ToastAndroid.showWithGravity(
          'Endereço IP não encontrado',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      else resolveCatchError(error);
    } finally {
      setLoadingScreen(false);
    }
  }, [navigation]);

  useEffect(() => {
    checkAsyncStorageIp();
  }, [checkAsyncStorageIp]);

  const onSubmit: SubmitHandler<AuthFormModel> = async ({ ip }): Promise<void> => {
    setLoadingScreen(true);

    try {
      const data = await ping({ ip });

      await AsyncStorage.setItem(asyncStorageKeys.ip, ip);
      await AsyncStorage.setItem('@data', JSON.stringify(data));

      navigation.push('Home');
    } catch (error) {
      if (error instanceof Error && error.message === 'Aborted')
        ToastAndroid.showWithGravity(
          'Endereço IP não encontrado',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      else resolveCatchError(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const handleTouchableOpacityText = loadingScreen ? 'Carregando...' : 'Conectar';

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Automação Residencial</Text>

        <Text style={styles.subtitle}>
          * Preencha o formulário incluindo o IP do Arduino para iniciar a automação...
        </Text>

        <View style={styles.form}>
          <Text style={styles.text}>IP do Arduino</Text>

          <TextInput
            keyboardType={'numeric'}
            onChangeText={(text): void => {
              setValue('ip', text);
              if (Object.prototype.hasOwnProperty.call(errors, 'ip')) clearErrors('ip');
            }}
            placeholder={'Digite o IP...'}
            placeholderTextColor={'#f3f3f3'}
            style={styles.textInput}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('ip')}
          />

          {!!errors.ip?.message && <Text style={styles.errorText}>{errors.ip.message}</Text>}

          <TouchableOpacity
            disabled={loadingScreen}
            onPress={handleSubmit(onSubmit)}
            style={styles.touchableOpacity}
          >
            <Text style={styles.touchableOpacityText}>{handleTouchableOpacityText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
