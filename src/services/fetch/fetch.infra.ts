import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PingInput } from 'models/arduino/ping.model';
import type { SetArduinoPineInput } from 'models/arduino/set-arduino-pine.model';

export const ping = async ({ ip }: PingInput): Promise<void> => {
  const timeout = 2000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  await fetch(`http://${ip}`, { signal: controller.signal });

  clearTimeout(id);
};

export const setArduinoPine = async ({ address, value }: SetArduinoPineInput): Promise<void> => {
  const ip = await AsyncStorage.getItem('@ip');

  const timeout = 2000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  await fetch(`http://${ip}?address=${address}&output=${value}`, { signal: controller.signal });

  clearTimeout(id);
};
