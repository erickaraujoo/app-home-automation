import { asyncStorageKeys } from 'config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ArduinoData } from 'models/arduino/get-arduino-data.model';
import type { PingInput } from 'models/arduino/ping.model';
import type { SetArduinoPineInput } from 'models/arduino/set-arduino-pine.model';

export const ping = async ({ ip }: PingInput): Promise<ArduinoData> => {
  const timeout = 2000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(`http://${ip}`, { signal: controller.signal });

  clearTimeout(id);

  const data = await response.json();

  return data;
};

export const setArduinoPine = async ({
  address,
  value
}: SetArduinoPineInput): Promise<ArduinoData> => {
  const ip = await AsyncStorage.getItem(asyncStorageKeys.ip);

  const timeout = 2000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(`http://${ip}?address=${address}&output=${value}`, {
    signal: controller.signal
  });

  clearTimeout(id);

  const data = await response.json();

  return data;
};
