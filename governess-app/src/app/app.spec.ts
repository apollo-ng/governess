import { GovernessApp }                       from './app.component';
import { MenuMock, NavMock, PlatformMock }    from '../mocks';
import { ControlPage }                        from '../pages/control/control';

let instance: GovernessApp = null;

describe('GovernessApp', () => {

  beforeEach(() => {
    instance = new GovernessApp((<any> new PlatformMock), (<any> new MenuMock));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with seven possible pages', () => {
    expect(instance['pages'].length).toEqual(7);
  });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(instance['app']).not.toBe(null);
  });
/*
  it('opens a page', () => {
    spyOn(instance['nav'], 'setRoot');
    instance.openPage(instance['pages'][0]);
    expect(instance['menu']['close']).toHaveBeenCalled();
    expect(instance['nav'].setRoot).toHaveBeenCalledWith(ControlPage);
  });
*/
});
