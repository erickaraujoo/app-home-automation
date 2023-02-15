import * as yup from 'yup';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { ping } from 'services/fetch/fetch.infra';
import { resolveCatchError } from 'utils/errors/resolve-catch-error.util';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FC } from 'react';
import type { StackNavigation } from 'models/arduino/native-stack/stack-param-list.model';
import type { SubmitHandler } from 'react-hook-form';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 56,
    paddingHorizontal: 20,
    paddingTop: 72
  },
  errorText: {
    color: '#CE3036',
    fontSize: 12,
    paddingTop: 12
  },
  form: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 56
  },
  safeAreaView: {
    flex: 1
  },
  subtitle: {
    color: '#f3f3f3',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 32,
    textAlign: 'center'
  },
  text: {
    color: '#f3f3f3',
    fontSize: 18,
    paddingVertical: 24
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: '#313136',
    color: '#f3f3f3',
    fontSize: 18,
    padding: 16,
    textShadowColor: 'white'
  },
  title: {
    color: '#f3f3f3',
    fontSize: 26,
    textAlign: 'center',
    width: '100%'
  },
  touchableOpacity: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#005CA9',
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 56,
    padding: 16
  },
  touchableOpacityText: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

const schema = yup.object().shape({
  ip: yup.string().required('IP é obrigatório')
});

interface Detail {
  ip: string;
}

export interface AuthScreenProps {
  navigation: StackNavigation;
}

export const AuthScreen: FC<AuthScreenProps> = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<Detail>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Detail> = async ({ ip }): Promise<void> => {
    setLoadingScreen(true);

    try {
      await ping({ ip });

      await AsyncStorage.setItem('@ip', ip);

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

  const checkAsyncStorageIp = useCallback(async (): Promise<void> => {
    const hasIp = await AsyncStorage.getItem('@ip');

    if (hasIp !== null) navigation.push('Home');
  }, [navigation]);

  const handleTouchableOpacityText = loadingScreen ? 'Carregando...' : 'Conectar';

  useEffect(() => {
    checkAsyncStorageIp();
  }, [checkAsyncStorageIp]);

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
