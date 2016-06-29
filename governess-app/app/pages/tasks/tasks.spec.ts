import { beforeEach, beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { asyncCallbackFactory, injectAsyncWrapper, providers }   from '../../../tests/diExports';
import { TasksPage }                                              from './tasks';

this.fixture = null;
this.instance = null;

describe('TasksPage', () => {

  beforeEachProviders(() => providers);
  beforeEach(injectAsyncWrapper(asyncCallbackFactory(TasksPage, this, true)));

  it('initialises', () => {
    expect(this.instance).not.toBeNull();
    expect(this.fixture).not.toBeNull();
  });
});
