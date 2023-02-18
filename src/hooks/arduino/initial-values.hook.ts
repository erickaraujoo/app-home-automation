export const arduinoAddresses = {
  one: 8,
  three: 12,
  two: 10
};

type InitialValues = {
  description: string;
  id: number;
  pines: {
    address: number;
    id: number;
    name: string;
    value: number;
    status: number;
  }[];
}[];

export const initalValues: InitialValues = [
  {
    description: 'Garagem',
    id: 1,
    pines: [
      {
        address: arduinoAddresses.two,
        id: 1,
        name: 'L12',
        status: 0,
        value: 9
      },
      {
        address: arduinoAddresses.two,
        id: 2,
        name: 'L13',
        status: 0,
        value: 10
      },
      {
        address: arduinoAddresses.two,
        id: 3,
        name: 'L14',
        status: 0,
        value: 11
      },
      {
        address: arduinoAddresses.two,
        id: 4,
        name: 'L15',
        status: 0,
        value: 12
      }
    ]
  },
  {
    description: 'Corredor Externo',
    id: 2,
    pines: [
      {
        address: arduinoAddresses.three,
        id: 1,
        name: 'L16',
        status: 0,
        value: 10
      }
    ]
  },
  {
    description: 'Corredor Interno',
    id: 3,
    pines: [
      {
        address: arduinoAddresses.one,
        id: 1,
        name: 'L04',
        status: 0,
        value: 9
      },
      {
        address: arduinoAddresses.one,
        id: 2,
        name: 'L06',
        status: 0,
        value: 11
      },
      {
        address: arduinoAddresses.two,
        id: 3,
        name: 'L08',
        status: 0,
        value: 5
      },
      {
        address: arduinoAddresses.two,
        id: 4,
        name: 'L10',
        status: 0,
        value: 7
      }
    ]
  },
  {
    description: 'Sala de Estar',
    id: 4,
    pines: [
      {
        address: arduinoAddresses.two,
        id: 1,
        name: 'L11',
        status: 0,
        value: 8
      }
    ]
  },
  {
    description: 'Banheiro',
    id: 5,
    pines: [
      {
        address: arduinoAddresses.two,
        id: 1,
        name: 'L09',
        status: 0,
        value: 6
      }
    ]
  },
  {
    description: 'Cozinha',
    id: 6,
    pines: [
      {
        address: arduinoAddresses.one,
        id: 1,
        name: 'L07',
        status: 0,
        value: 12
      }
    ]
  },
  {
    description: 'Quarto',
    id: 7,
    pines: [
      {
        address: arduinoAddresses.one,
        id: 1,
        name: 'L05',
        status: 0,
        value: 10
      }
    ]
  },
  {
    description: 'Banheiro Suíte',
    id: 8,
    pines: [
      {
        address: arduinoAddresses.one,
        id: 1,
        name: 'L03',
        status: 0,
        value: 8
      }
    ]
  },
  {
    description: 'Quarto Suíte',
    id: 9,
    pines: [
      {
        address: arduinoAddresses.one,
        id: 1,
        name: 'L01',
        status: 0,
        value: 6
      },
      {
        address: arduinoAddresses.one,
        id: 2,
        name: 'L02',
        status: 0,
        value: 7
      }
    ]
  }
];
