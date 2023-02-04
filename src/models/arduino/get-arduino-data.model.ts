export type ArduinoData = {
  address: number;
  pines: {
    pine: number;
    status: number;
  }[];
}[];
