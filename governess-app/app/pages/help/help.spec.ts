import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../tests/diExports';
import { HelpPage }                                              from './help';

this.fixture = null;
this.instance = null;

describe('HelpPage', () => {

  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(HelpPage, this, true)));

  it('initialises', () => {
    expect(this.instance).not.toBeNull();
    expect(this.fixture).not.toBeNull();
  });
});
