import type { ArduinoData } from 'models/arduino/get-arduino-data.model';

const url = '';

export const getArduinoData = async (): Promise<ArduinoData> => {
  const data = await fetch(url);

  const json: ArduinoData = await data.json();

  return json;
};
