export const lamps = {
  five: 8,
  four: 7,
  one: 4,
  six: 9,
  three: 6,
  two: 5
};

export const addresses = {
  one: 8,
  three: 12,
  two: 10
};

export const initalValues = [
  {
    description: 'Garagem',
    id: 1,
    name: 'garage',
    pines: [
      {
        address: addresses.two,
        id: 1,
        name: 'L12',
        value: lamps.six
      },
      {
        address: addresses.three,
        id: 2,
        name: 'L13',
        value: lamps.one
      },
      {
        address: addresses.three,
        id: 3,
        name: 'L14',
        value: lamps.two
      },
      {
        address: addresses.three,
        id: 4,
        name: 'L15',
        value: lamps.three
      }
    ]
  },
  {
    description: 'Corredor Externo',
    id: 2,
    name: 'external-hall',
    pines: [
      {
        address: addresses.three,
        id: 1,
        name: 'L16',
        value: lamps.four
      },
      {
        address: addresses.three,
        id: 2,
        name: 'L17',
        value: lamps.five
      },
      {
        address: addresses.three,
        id: 3,
        name: 'L18',
        value: lamps.six
      }
    ]
  },
  {
    description: 'Corredor Interno',
    id: 3,
    name: 'internal-hall',
    pines: [
      {
        address: addresses.one,
        id: 1,
        name: 'L4',
        value: lamps.four
      },
      {
        address: addresses.one,
        id: 2,
        name: 'L6',
        value: lamps.six
      },
      {
        address: addresses.two,
        id: 3,
        name: 'L8',
        value: lamps.two
      },
      {
        address: addresses.two,
        id: 4,
        name: 'L10',
        value: lamps.four
      }
    ]
  },
  {
    description: 'Sala de Estar',
    id: 4,
    name: 'living-room',
    pines: [
      {
        address: addresses.two,
        id: 1,
        name: 'L11',
        value: lamps.five
      }
    ]
  },
  {
    description: 'Banheiro',
    id: 5,
    name: 'bathroom',
    pines: [
      {
        address: addresses.two,
        id: 1,
        name: 'L09',
        value: lamps.three
      }
    ]
  },
  {
    description: 'Cozinha',
    id: 6,
    name: 'kitchen',
    pines: [
      {
        address: addresses.two,
        id: 1,
        name: 'L07',
        value: lamps.one
      }
    ]
  },
  {
    description: 'Quarto',
    id: 7,
    name: 'room',
    pines: [
      {
        address: addresses.one,
        id: 1,
        name: 'L05',
        value: lamps.five
      }
    ]
  },
  {
    description: 'Banheiro Suíte',
    id: 8,
    name: 'bathroom-suit',
    pines: [
      {
        address: addresses.one,
        id: 1,
        name: 'L03',
        value: lamps.three
      }
    ]
  },
  {
    description: 'Quarto Suíte',
    id: 9,
    name: 'room-suit',
    pines: [
      {
        address: addresses.one,
        id: 1,
        name: 'L01',
        value: lamps.one
      },
      {
        address: addresses.one,
        id: 2,
        name: 'L02',
        value: lamps.two
      }
    ]
  }
];
