export let pluginMock: any = {
  'input': [
    {
      'pid': '3jO8dBtt2',
      'name': 'Simple GPIO Input Driver',
      'group': 'GPIO',
      'type': 'boolean',
      'conf': {
        'PIN': {},
      },
    },
    {
      'pid': '3jO8dBtt2',
      'name': 'Hallsensor RPM Input Driver',
      'group': 'GPIO',
      'type': 'float',
      'conf': {
        'PIN': {},
      },
    },
    {
      'pid': 'AbCdEfGhIj',
      'name': 'MAX31885 K-Type Thermocouple Adapter Driver',
      'group': 'SPI',
      'unit': '°C',
      'type': 'float',
      'conf': {
        'CSEL': {},
        'CLCK': {},
        'DATA': {},
      },
    },
    {
      'pid': 'ZkLMnbGhzU',
      'name': 'MAX6675 K-Type Thermocouple Adapter Driver',
      'group': 'SPI',
      'type': 'float',
      'conf': {
        'CSEL': {},
        'CLCK': {},
        'DATA': {},
      },
    },
  ],
  'control': [
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PID Temperature Governor',
      'group': 'Temperature',
      'conf': {
        'TEMP': {},
        'HEAT': {},
        'COOL': {},
        'K_P': {},
        'K_I': {},
        'K_D': {},
      },
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PID Speed Governor',
      'group': 'Speed',
      'conf': {
        'PIN': {},
        'INV': {},
      },
    },
  ],
  'output': [
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'Simple GPIO Output Driver',
      'group': 'GPIO',
      'type': 'boolean',
      'conf': {
        'PIN': {},
        'INV': {},
      },
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'Simple PWM Output Driver',
      'group': 'GPIO',
      'type': 'float',
      'conf': {
        'PIN': {},
        'INV': {},
      },
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PCA9685 16-Channel 12-Bit PWM Driver',
      'group': 'I2C',
      'type': 'float',
      'conf': {
        'CHN': {},
        'FSW': {},
        'SDA': {},
        'SCL': {},
      },
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'TLC5947 24-Channel 12-Bit PWM Driver',
      'group': 'SPI',
      'type': 'float',
      'conf': {
        'CHN': {},
        'FSW': {},
        'DIN': {},
        'CLK': {},
        'LAT': {},
      },
    },
  ],
};
