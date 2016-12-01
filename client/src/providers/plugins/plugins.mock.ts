export let pluginMock: any = {
  'input': [
    {
      'pid': '3jO8dBtt2',
      'name': 'Simple GPIO Input Driver',
      'desc': '',
      'group': 'GPIO',
      'type': 'boolean',
      'conf': [
        { 'name': 'PIN' },
        { 'name': 'INV' },
      ],
    },
    {
      'pid': '3jO8dBtt2',
      'name': 'Hallsensor RPM Input Driver',
      'desc': '',
      'group': 'GPIO',
      'type': 'float',
      'conf': [
        { 'name': 'PIN' },
        { 'name': 'INV' },
      ],
    },
    {
      'pid': 'AbCdEfGhIj',
      'name': 'MAX31885 K-Type Thermocouple Adapter Driver',
      'desc': '',
      'group': 'SPI',
      'unit': '°C',
      'type': 'float',
      'conf': [
        { 'name': 'CSEL' },
        { 'name': 'CLCK' },
        { 'name': 'DATA' },
      ],
    },
    {
      'pid': 'ZkLMnbGhzU',
      'name': 'MAX6675 K-Type Thermocouple Adapter Driver',
      'desc': '',
      'group': 'SPI',
      'type': 'float',
      'conf': [
        { 'name': 'CSEL' },
        { 'name': 'CLCK' },
        { 'name': 'DATA' },
      ],
    },
    {
      'pid': 'ZkLMnbGhzU',
      'name': 'ADS1118 K-Type Thermocouple Adapter Driver',
      'desc': '16-Bit Analog-to-Digital Converter with Internal Reference and Temperature Sensor',
      'group': 'SPI',
      'type': 'float',
      'conf': [
        { 'name': 'SCLK' },
        { 'name': 'SDO' },
        { 'name': 'SDI' },
        { 'name': '/SS' },
      ],
    },
  ],
  'control': [
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PID Temperature Governor',
      'desc': '',
      'group': 'Temperature',
      'conf': [
        { 'name': 'TEMP' },
        { 'name': 'HEAT' },
        { 'name': 'COOL' },
        { 'name': 'K_P' },
        { 'name': 'K_I' },
        { 'name': 'K_D' },
      ],
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PID Speed Governor',
      'desc': '',
      'group': 'Speed',
      'conf': [
        { 'name': 'RPM' },
        { 'name': 'K_P' },
        { 'name': 'K_I' },
        { 'name': 'K_D' },
      ],
    },
  ],
  'output': [
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'Simple GPIO Output Driver',
      'desc': '',
      'group': 'GPIO',
      'type': 'boolean',
      'conf': [
        { 'name': 'PIN' },
        { 'name': 'INV' },
      ],
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'Simple PWM Output Driver',
      'desc': '',
      'group': 'GPIO',
      'type': 'float',
      'conf': [
        { 'name': 'PIN' },
        { 'name': 'INV' },
      ],
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'PCA9685 16-Channel 12-Bit PWM Driver',
      'desc': '',
      'group': 'I2C',
      'type': 'float',
      'conf': [
        { 'name': 'CHN' },
        { 'name': 'FSW' },
        { 'name': 'SDA' },
        { 'name': 'SCL' },
      ],
    },
    {
      'pid': 'T6Dc0GhaqZt',
      'name': 'TLC5947 24-Channel 12-Bit PWM Driver',
      'desc': '',
      'group': 'SPI',
      'type': 'float',
      'conf': [
        { 'name': 'CHN' },
        { 'name': 'FSW' },
        { 'name': 'DIN' },
        { 'name': 'CLK' },
        { 'name': 'LAT' },
      ],
    },
  ],
};
