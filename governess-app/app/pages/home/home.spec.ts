import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../tests/diExports';
import { HomePage }                                              from './home';

this.fixture = null;
this.instance = null;

describe('HomePage', () => {

  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(HomePage, this, true)));

  it('initialises', () => {
    this.instance.config.ctrlMode = '';
    this.fixture.detectChanges();
    expect(this.instance).not.toBeNull();
    expect(this.fixture).not.toBeNull();
  });
});
