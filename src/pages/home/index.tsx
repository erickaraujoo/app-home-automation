import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { SafeAreaView } from 'react-native-safe-area-context';
import { initalValues } from 'hooks/arduino/initial-values.hook';
import { resolveCatchError } from 'utils/errors/resolve-catch-error.util';
import { setArduinoPine } from 'services/fetch/fetch.infra';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FC } from 'react';
import type { StackNavigation } from 'models/arduino/native-stack/stack-param-list.model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 72,
    paddingHorizontal: 20
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  flexButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  headingTitle: {
    color: '#f3f3f3',
    fontSize: 28,
    textAlign: 'center'
  },
  sectionText: {
    color: '#f3f3f3',
    fontSize: 18,
    paddingVertical: 12
  },
  session: {
    marginVertical: 8,
    textAlign: 'center',
    width: '100%'
  },
  touchableOpacity: {
    backgroundColor: '#005CA9',
    borderRadius: 4,
    flex: 1,
    margin: 8,
    minWidth: 65,
    padding: 16
  },
  touchableOpacityText: {
    color: '#f3f3f3',
    fontSize: 16,
    textAlign: 'center'
  }
});

export interface HomeScreenProps {
  navigation: StackNavigation;
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  const handlePine = async ({
    address,
    value
  }: {
    address: number;
    value: number;
  }): Promise<void> => {
    setLoadingScreen(true);

    try {
      await setArduinoPine({ address, value });
    } catch (error) {
      if (error instanceof Error && error.message === 'Aborted')
        ToastAndroid.showWithGravity(
          'Tempo da solicitação expirada',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      else resolveCatchError(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@ip');

      if (navigation.canGoBack()) navigation.goBack();
      else navigation.push('Auth');
    } catch (error) {
      resolveCatchError(error);
    }
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon color={'#f3f3f3'} name={'log-out'} onPress={handleLogout} size={24} />
      )
    });
  }, [handleLogout, navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            {initalValues.map(({ id: sessionId, description, pines }) => (
              <View key={sessionId} style={styles.session}>
                <Text style={styles.sectionText}>{description}</Text>

                <View style={styles.flexButtons}>
                  {pines.map(({ id: pineId, address, name, value }) => (
                    <TouchableOpacity
                      key={pineId}
                      disabled={loadingScreen}
                      onPress={(): Promise<void> => handlePine({ address, value })}
                      style={styles.touchableOpacity}
                    >
                      <Text style={styles.touchableOpacityText}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
