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
      'icon': '',
      'created': Math.round( new Date().getTime() / 1000 ),
      'notes': '',
      'type': 'profile',
      'data': {
          'control': 'Temperature',
          'active': true,
          'show': true,
          'options': {
              'axis': 'y-axis-1',
              'color': '#CA8512',
              'drawPoints': true,
              'pointSize': 4,
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
    },
    ];
