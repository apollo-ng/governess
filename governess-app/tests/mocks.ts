
// IONIC:

export class ConfigMock {

  public get(): any {
    let mockConfig: Object = {
      'userLang': 'en',
      'theme'   : 'default-dark',
      'ctrlMode': 'auto',
      'viewPref': 'last',
      'lastView': 'Home',
      'manOverr': false,
    };
    return mockConfig;
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}
