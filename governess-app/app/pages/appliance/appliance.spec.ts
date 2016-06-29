import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../tests/diExports';
import { AppliancePage }                                              from './appliance';

this.fixture = null;
this.instance = null;

describe('AppliancePage', () => {

  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(AppliancePage, this, true)));

  it('initialises', () => {
    expect(this.instance).not.toBeNull();
    expect(this.fixture).not.toBeNull();
  });
});
