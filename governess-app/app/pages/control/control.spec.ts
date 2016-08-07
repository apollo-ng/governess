import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../tests/diExports';
import { ControlPage }                                              from './control';

this.fixture = null;
this.instance = null;

describe('HomePage', () => {

  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(ControlPage, this, true)));

  it('initialises', () => {
    this.fixture.detectChanges();
    expect(this.instance).not.toBeNull();
    expect(this.fixture).not.toBeNull();
  });
});
