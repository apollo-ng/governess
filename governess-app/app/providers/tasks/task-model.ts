export interface Task {
  name: string;
  userLang: string;
  ctrlMode: string;
  lastView?: string;
}

export let TASKMODEL: Array<any> = [{
    'id': '123',
    'dev-id': 'xyz',
    'name': 'Reflow Lead-Free',
    'icon': 'star-outline',
    'created': Math.round( new Date().getTime() / 1000 ),
    'notes': '',
    'type': 'profile',
    'data': [
      {
        'control': 'Temperature',
        'active': true,
        'show': true,
        'options': {
            'yAxisID': 'y-axis-1',
            'color': 'rgb(255, 152, 0)',
            'fill': false,
            'drawPoints': true,
            'pointRadius': 3,
            'pointBorderWidth': 2,
            'strokeWidth': 2,
        },
        'points': [
            [0, 25],
            [82, 151],
            [162, 185],
            [197, 225],
            [202, 225],
            [233, 175],
            [300, 50],
        ],
      },
      {
        'control': 'Circulation',
        'active': true,
        'show': true,
        'options': {
            'yAxisID': 'y-axis-2',
            'color': 'rgb(144, 73, 249)',
            'fill': true,
            'drawPoints': true,
            'pointRadius': 0,
            'pointBorderWidth': 1,
            'strokeWidth': 1,
        },
        'points': [
            [0, 1],
            [175, 1],
            [176, 0],
            [233, 0],
            [234, 1],
            [300, 1],
        ],
      },
    ],
  },
];
