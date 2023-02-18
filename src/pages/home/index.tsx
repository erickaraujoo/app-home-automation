/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { BackHandler, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { arduinoAddresses } from 'hooks/arduino/initial-values.hook';
import { asyncStorageKeys } from 'config/constants';
import { resolveCatchError } from 'utils/errors/resolve-catch-error.util';
import { setArduinoPine } from 'services/fetch/fetch.infra';
import { styles } from './styles';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import type { ArduinoData } from 'models/arduino/get-arduino-data.model';
import type {
  ConfortableDefaultValues,
  ConfortablesDefaultValues
} from 'models/arduino/comfortable/confortable-default-values.model';
import type { FC } from 'react';
import type { HandlePine } from 'models/arduino/handle-pine.model';
import type { HomeScreenProps } from 'models/props/home.props.model';

const defaultValues = {
  bathroomPines: {
    one: 6
  },
  bathroomSuitePines: {
    one: 8
  },
  bedroomPines: {
    one: 10
  },
  bedroomSuitePines: {
    one: 6,
    two: 7
  },
  emptyArray: 0,
  externalHallPines: {
    one: 10,
    three: 12,
    two: 11
  },
  garagePines: {
    four: 12,
    one: 9,
    three: 11,
    two: 10
  },
  internalHallPines: {
    four: 7,
    one: 9,
    three: 5,
    two: 11
  },
  kitchenPines: {
    one: 12
  },
  livingRoomPines: {
    one: 8
  }
};

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [arduinoData, setArduinoData] = useState<ArduinoData>([]);
  const [garageValues, setGarageValues] = useState<ConfortablesDefaultValues>([]);
  const [externalHallValues, setExternalHallValues] = useState<ConfortablesDefaultValues>([]);
  const [internalHallValues, setInternalHallValues] = useState<ConfortablesDefaultValues>([]);
  const [livingRoomValues, setLivingRoomValues] = useState<ConfortablesDefaultValues>([]);
  const [bathroomValues, setBathroomValues] = useState<ConfortablesDefaultValues>([]);
  const [kitchenValues, setKitchenValues] = useState<ConfortablesDefaultValues>([]);
  const [bedroomValues, setBedroomValues] = useState<ConfortablesDefaultValues>([]);
  const [bathroomSuiteValues, setBathroomSuiteValues] = useState<ConfortablesDefaultValues>([]);
  const [bedroomSuiteValues, setBedroomSuiteValues] = useState<ConfortablesDefaultValues>([]);
  const [internalHallValuesUpdated, setInternalHallValuesUpdated] = useState<boolean>(false);

  const handleAsyncStorageArduinoData = async (): Promise<void> => {
    try {
      const asyncStorageArduinoData = await AsyncStorage.getItem('@data');

      if (asyncStorageArduinoData !== null)
        setArduinoData(JSON.parse(asyncStorageArduinoData) as ArduinoData);
    } catch (error) {
      resolveCatchError(error);
    }
  };

  useEffect(() => {
    handleAsyncStorageArduinoData();
  }, []);

  const handleGarageValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.garagePines.one)
      setGarageValues((prev) => [...prev, { address, name: 'L12', status, value: pine }].reverse());
    if (pine === defaultValues.garagePines.two)
      setGarageValues((prev) => [...prev, { address, name: 'L13', status, value: pine }]);
    if (pine === defaultValues.garagePines.three)
      setGarageValues((prev) => [...prev, { address, name: 'L14', status, value: pine }]);
    if (pine === defaultValues.garagePines.four)
      setGarageValues((prev) => [...prev, { address, name: 'L15', status, value: pine }].reverse());
  };

  const handleExternalHallValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.externalHallPines.one)
      setExternalHallValues((prev) => [...prev, { address, name: 'L16', status, value: pine }]);
    if (pine === defaultValues.externalHallPines.two)
      setExternalHallValues((prev) => [...prev, { address, name: 'L17', status, value: pine }]);
    if (pine === defaultValues.externalHallPines.three)
      setExternalHallValues((prev) => [...prev, { address, name: 'L18', status, value: pine }]);
  };

  const handleInternalHallValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (address === arduinoAddresses.one) {
      if (pine === defaultValues.internalHallPines.one)
        setInternalHallValues((prev) => [...prev, { address, name: 'L04', status, value: pine }]);

      if (pine === defaultValues.internalHallPines.two)
        setInternalHallValues((prev) => [...prev, { address, name: 'L06', status, value: pine }]);
    }

    if (address === arduinoAddresses.two) {
      if (pine === defaultValues.internalHallPines.three)
        setInternalHallValues((prev) => [...prev, { address, name: 'L08', status, value: pine }]);

      if (pine === defaultValues.internalHallPines.four)
        setInternalHallValues((prev) => [...prev, { address, name: 'L10', status, value: pine }]);
    }
  };

  const handleLivingRoomValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.livingRoomPines.one)
      setLivingRoomValues((prev) => [...prev, { address, name: 'L11', status, value: pine }]);
  };

  const handleBathroomValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.bathroomPines.one)
      setBathroomValues((prev) => [...prev, { address, name: 'L09', status, value: pine }]);
  };

  const handleKitchenValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.kitchenPines.one)
      setKitchenValues((prev) => [...prev, { address, name: 'L07', status, value: pine }]);
  };

  const handleBedroomValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.bedroomPines.one)
      setBedroomValues((prev) => [...prev, { address, name: 'L05', status, value: pine }]);
  };

  const handleBathroomSuiteValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.bathroomSuitePines.one)
      setBathroomSuiteValues((prev) => [...prev, { address, name: 'L03', status, value: pine }]);
  };

  const handleBedroomSuiteValues = ({ address, pine, status }: ConfortableDefaultValues): void => {
    if (pine === defaultValues.bedroomSuitePines.one)
      setBedroomSuiteValues((prev) =>
        [...prev, { address, name: 'L01', status, value: pine }].reverse()
      );
    if (pine === defaultValues.bedroomSuitePines.two)
      setBedroomSuiteValues((prev) =>
        [...prev, { address, name: 'L02', status, value: pine }].reverse()
      );
  };

  useEffect(() => {
    if (arduinoData.length > defaultValues.emptyArray)
      arduinoData.forEach(({ address, pines }) =>
        pines.forEach(({ pine, status }) => {
          if (address === arduinoAddresses.one) {
            handleBathroomSuiteValues({ address, pine, status });
            handleBedroomSuiteValues({ address, pine, status });
            handleInternalHallValues({ address, pine, status });
            handleBedroomValues({ address, pine, status });
            handleKitchenValues({ address, pine, status });
          }

          if (address === arduinoAddresses.two) {
            handleInternalHallValues({ address, pine, status });
            handleBathroomValues({ address, pine, status });
            handleLivingRoomValues({ address, pine, status });
            handleGarageValues({ address, pine, status });
          }

          if (address === arduinoAddresses.three)
            handleExternalHallValues({ address, pine, status });
        })
      );
  }, [arduinoData]);

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(asyncStorageKeys.ip);
      await AsyncStorage.removeItem(asyncStorageKeys.data);

      setArduinoData([]);
      setBedroomSuiteValues([]);

      if (navigation.canGoBack()) navigation.goBack();
      else navigation.push('Auth');
    } catch (error) {
      resolveCatchError(error);
    }
  }, [navigation]);

  const handlePine = async ({ address, value }: HandlePine): Promise<void> => {
    setLoadingScreen(true);

    try {
      const data = await setArduinoPine({ address, value });

      setGarageValues([]);
      setExternalHallValues([]);
      setInternalHallValues([]);
      setLivingRoomValues([]);
      setBathroomValues([]);
      setKitchenValues([]);
      setBedroomValues([]);
      setBathroomSuiteValues([]);
      setBedroomSuiteValues([]);
      setInternalHallValuesUpdated(false);

      setArduinoData(data);
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

  useEffect(() => {
    if (
      internalHallValuesUpdated === false &&
      internalHallValues.length > defaultValues.emptyArray
    ) {
      const newValues: ConfortablesDefaultValues = [];

      const firstIndex = 0;
      const secondIndex = 1;
      const thirdIndex = 2;
      const fouthIndex = 3;

      const firstValue = internalHallValues[firstIndex];
      const secondValue = internalHallValues[secondIndex];
      const thirdValue = internalHallValues[thirdIndex];
      const fourthValue = internalHallValues[fouthIndex];

      if (typeof secondValue !== 'undefined') newValues.push(secondValue);
      if (typeof firstValue !== 'undefined') newValues.push(firstValue);
      if (typeof fourthValue !== 'undefined') newValues.push(fourthValue);
      if (typeof thirdValue !== 'undefined') newValues.push(thirdValue);

      setInternalHallValues(newValues);
      setInternalHallValuesUpdated(!internalHallValuesUpdated);
    }
  }, [internalHallValues, internalHallValuesUpdated]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <>
              {garageValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Garagem</Text>

                  <View style={styles.flexButtons}>
                    {garageValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {externalHallValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Corredor Externo</Text>

                  <View style={styles.flexButtons}>
                    {externalHallValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {internalHallValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Corredor Interno</Text>

                  <View style={styles.flexButtons}>
                    {internalHallValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {livingRoomValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Sala de Estar</Text>

                  <View style={styles.flexButtons}>
                    {livingRoomValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {bathroomValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Banheiro</Text>

                  <View style={styles.flexButtons}>
                    {bathroomValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {kitchenValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Cozinha</Text>

                  <View style={styles.flexButtons}>
                    {kitchenValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {bedroomValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Quarto</Text>

                  <View style={styles.flexButtons}>
                    {bedroomValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {bathroomSuiteValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Banheiro Suíte</Text>

                  <View style={styles.flexButtons}>
                    {bathroomSuiteValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {bedroomSuiteValues.length > defaultValues.emptyArray && (
                <View style={styles.session}>
                  <Text style={styles.sectionText}>Quarto Suíte</Text>

                  <View style={styles.flexButtons}>
                    {bedroomSuiteValues.map(({ address, name, value, status }) => (
                      <TouchableOpacity
                        key={name}
                        disabled={loadingScreen}
                        onPress={(): Promise<void> => handlePine({ address, value })}
                        style={[status ? styles.offTouchableOpacity : styles.onTouchableOpacity]}
                      >
                        <Text style={styles.touchableOpacityText}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
